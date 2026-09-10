#!/bin/sh
set -eu
: "${DATABASE_URL:?DATABASE_URL is required}"
: "${R2_ENDPOINT:?R2_ENDPOINT is required}"
: "${R2_BUCKET:?R2_BUCKET is required}"
: "${R2_ACCESS_KEY_ID:?R2_ACCESS_KEY_ID is required}"
: "${R2_SECRET_ACCESS_KEY:?R2_SECRET_ACCESS_KEY is required}"

export AWS_ACCESS_KEY_ID="$R2_ACCESS_KEY_ID"
export AWS_SECRET_ACCESS_KEY="$R2_SECRET_ACCESS_KEY"

backup_dir=$(mktemp -d)
trap 'rm -f "$backup_dir/dump.sql" "$backup_dir/dump.sql.gz"; rmdir "$backup_dir"' EXIT
trap 'exit 1' HUP INT TERM

while true; do
  name="postgres-$(date -u +%Y-%m-%dT%H-%M-%SZ).sql.gz"
  pg_dump "$DATABASE_URL" -f "$backup_dir/dump.sql"
  gzip "$backup_dir/dump.sql"
  aws s3 cp "$backup_dir/dump.sql.gz" "s3://${R2_BUCKET}/backups/${name}" --endpoint-url "$R2_ENDPOINT" --region auto
  rm -f "$backup_dir/dump.sql.gz"
  echo "Uploaded ${name}"
  sleep 259200
done
