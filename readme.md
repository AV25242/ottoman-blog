Creating Scopes and Collections for Couchbase Server 6.5.1 with Developer Preview on, Ideally Ottoman will should create it.

curl -X POST -v -u Administrator:password http://127.0.0.1:8091/pools/default/buckets/travel/collections -d name=region-us
curl -X POST -v -u Administrator:password http://127.0.0.1:8091/pools/default/buckets/travel/collections/dbo -d name=blogs
curl -X POST -v -u Administrator:password http://127.0.0.1:8091/pools/default/buckets/travel/collections/dbo -d name=authors
