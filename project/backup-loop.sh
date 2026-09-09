#!/bin/sh
set -eu
: "\${DATABASE_URL:?DATABASE_URL is required}"
: "\${R2_ENDPOINT:?R2_ENDPOINT is required}"
: "\${R2_BUCKET:?R2_BUCKET is required}"
: "\${R2_ACCESS_KEY_ID:?R2_ACCESS_KEY_ID is required}"
: "\${R2_SECRET_ACCESS_KEY:?R2_SECRET_ACCESS_KEY is required}"
while true; do
  name="postgres-$(date -u +%Y-%m-%dT%H-%M-%SZ).sql.gz"
  pg_dump "$DATABASE_URL" | gzip | aws s3 cp - "s3://\${R2_BUCKET}/backups/\${name}" --endpoint-url "$R2_ENDPOINT" --region auto
  echo "Uploaded \${name}"
  sleep 259200
done
