## 2024-04-08 - Request Logging Middleware Overhead
**Learning:** The Express request logging middleware was capturing and keeping a reference to the full response body (`resBody`) for every request by intercepting `res.json`. This memory allocation is entirely wasted since `resBody` is never used, creating unnecessary memory overhead and GC pressure.
**Action:** Avoid intercepting and capturing response bodies in logging middleware unless specifically needed. Remove unused closures to free up memory faster.

## 2024-04-26 - Drizzle ORM Prepared Statements Optimization
**Learning:** Drizzle ORM query builders dynamically generate SQL strings on every execution. For frequently called queries, compiling the queries once and reusing them via `db...prepare('name')` with `sql.placeholder('param')` reduces the overhead of parsing and stringifying SQL for every request, improving CPU utilization and throughput on the backend.
**Action:** Use `.prepare()` for common SELECT queries and pass variables via `.execute({ param: value })` to save computation cycles on hot paths.
