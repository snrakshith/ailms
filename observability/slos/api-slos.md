# Initial SLOs

- Availability target: 99.9% successful API requests excluding expected 4xx.
- Latency target: p95 under 500ms for simple task operations, measured at server edge.
- RUM: report p75 LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.
- These are example objectives and must be validated under representative traffic.
- Alert policies need real traffic baseline and paging integration before launch.
