## 2024-04-08 - Request Logging Middleware Overhead
**Learning:** The Express request logging middleware was capturing and keeping a reference to the full response body (`resBody`) for every request by intercepting `res.json`. This memory allocation is entirely wasted since `resBody` is never used, creating unnecessary memory overhead and GC pressure.
**Action:** Avoid intercepting and capturing response bodies in logging middleware unless specifically needed. Remove unused closures to free up memory faster.
