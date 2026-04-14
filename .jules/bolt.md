## 2024-04-08 - Request Logging Middleware Overhead
**Learning:** The Express request logging middleware was capturing and keeping a reference to the full response body (`resBody`) for every request by intercepting `res.json`. This memory allocation is entirely wasted since `resBody` is never used, creating unnecessary memory overhead and GC pressure.
**Action:** Avoid intercepting and capturing response bodies in logging middleware unless specifically needed. Remove unused closures to free up memory faster.
## 2026-04-14 - React Query Stale Time
**Learning:** TanStack React Query uses a default `staleTime` of 0, causing refetches every time a window regains focus or the component remounts. For non-critical data like sessions overview, this causes unnecessary network and DB load.
**Action:** Always consider adding `staleTime` to `useQuery` for data that doesn't need to be strictly real-time.
