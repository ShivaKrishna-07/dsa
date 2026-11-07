export const systemDesignData = {
  fundamentals: [
    {
      id: "phase-1",
      phase: "Phase 1",
      title: "System Design Basics",
      duration: "Week 1",
      description: "Core architectural paradigms, scaling types, availability metrics, and estimation formulas.",
      topics: [
        { id: "p1-1", title: "What is HLD? HLD vs LLD" },
        { id: "p1-8", title: "Functional vs Non-functional requirements" },
        { id: "p1-2", title: "Monolith vs microservices" },
        { id: "p1-3", title: "Vertical vs horizontal scaling" },
        { id: "p1-4", title: "Stateless vs stateful architecture" },
        { id: "p1-5", title: "Latency, throughput, QPS and availability" },
        { id: "p1-9", title: "High Availability" },
        { id: "p1-6", title: "Reliability, fault tolerance and single point of failure" },
        { id: "p1-7", title: "Back-of-the-envelope estimation (traffic, storage, bandwidth)" }
      ]
    },
    {
      id: "phase-2",
      phase: "Phase 2",
      title: "Networking and APIs",
      duration: "Week 2",
      description: "How data flows from client browsers through DNS, proxies, load balancers, and gateways.",
      topics: [
        { id: "p2-1", title: "DNS and how a browser request reaches a server" },
        { id: "p2-2", title: "HTTP/HTTPS and TCP vs UDP basics" },
        { id: "p2-3", title: "REST API design and HTTP methods" },
        { id: "p2-8", title: "gRPC and GraphQL" },
        { id: "p2-4", title: "WebSockets vs polling vs SSE" },
        { id: "p2-5", title: "Load balancer (L4/L7 and basic algorithms)" },
        { id: "p2-9", title: "Service Discovery" },
        { id: "p2-6", title: "Reverse proxy and API Gateway" },
        { id: "p2-7", title: "CDN and how content is delivered" }
      ]
    },
    {
      id: "phase-3",
      phase: "Phase 3",
      title: "Databases and Caching",
      duration: "Weeks 3–4",
      description: "Storage paradigms, indexing, replication, partitioning, and caching strategies.",
      topics: [
        { id: "p3-1", title: "SQL vs NoSQL (relational, document and key-value)" },
        { id: "p3-12", title: "Object storage (AWS S3), multipart uploads and basic video transcoding" },
        { id: "p3-2", title: "Database schema design and normalization" },
        { id: "p3-3", title: "Indexing and B-Tree basics" },
        { id: "p3-13", title: "Geohashing" },
        { id: "p3-4", title: "Replication and read replicas" },
        { id: "p3-5", title: "Sharding and partitioning" },
        { id: "p3-6", title: "Consistent hashing (basic understanding)" },
        { id: "p3-7", title: "ACID and database transactions" },
        { id: "p3-14", title: "Concurrency control: optimistic vs pessimistic locking" },
        { id: "p3-8", title: "CAP theorem and strong vs eventual consistency" },
        { id: "p3-15", title: "PACELC theorem" },
        { id: "p3-9", title: "Redis and caching strategies" },
        { id: "p3-10", title: "Cache eviction: LRU and LFU" },
        { id: "p3-11", title: "Cache invalidation and cache stampede" }
      ]
    },
    {
      id: "phase-4",
      phase: "Phase 4",
      title: "Messaging and Distributed Systems",
      duration: "Week 5",
      description: "Async pipelines, message brokers, distributed synchronization, and failure isolation.",
      topics: [
        { id: "p4-1", title: "Synchronous vs asynchronous communication" },
        { id: "p4-2", title: "Message queues and Pub/Sub" },
        { id: "p4-3", title: "Kafka basics: topics, partitions and consumers" },
        { id: "p4-4", title: "Retries, exponential backoff and dead-letter queues" },
        { id: "p4-5", title: "Idempotency and duplicate requests" },
        { id: "p4-9", title: "Distributed Transactions – Saga" },
        { id: "p4-6", title: "Distributed locks (basic understanding)" },
        { id: "p4-10", title: "Leader Election" },
        { id: "p4-7", title: "Timeouts and circuit breakers" },
        { id: "p4-8", title: "Basic logging, monitoring and health checks" }
      ]
    },
    {
      id: "phase-5",
      phase: "Phase 5",
      title: "Reliability and Security",
      duration: "Week 6",
      description: "Authentication, rate limiting algorithms, failover strategies, and security fundamentals.",
      topics: [
        { id: "p5-1", title: "Authentication vs authorization" },
        { id: "p5-2", title: "JWT and session-based authentication" },
        { id: "p5-3", title: "Rate limiting: Token Bucket and Sliding Window" },
        { id: "p5-4", title: "Horizontal scaling and auto-scaling" },
        { id: "p5-5", title: "Failover and graceful degradation" },
        { id: "p5-6", title: "Backups and disaster recovery" },
        { id: "p5-7", title: "Basic security: HTTPS, encryption and access control" }
      ]
    }
  ],

  questions: [
    {
      id: "grp-1",
      group: "Group 1 – Core Backend Systems",
      items: [
        { id: "q1", title: "URL Shortener (TinyURL)", concept: "ID generation, caching, redirects", difficulty: "Easy" },
        { id: "q2", title: "Rate Limiter", concept: "Redis, algorithms, distributed counters", difficulty: "Medium" },
        { id: "q3", title: "Distributed Key-Value Store", concept: "Replication, partitioning, consistency", difficulty: "Medium" },
        { id: "q4", title: "Web Crawler", concept: "Distributed workers, queues, deduplication", difficulty: "Medium" }
      ]
    },
    {
      id: "grp-2",
      group: "Group 2 – Real-time and Communication",
      items: [
        { id: "q5", title: "WhatsApp / Chat System", concept: "WebSockets, message delivery, presence", difficulty: "Hard" },
        { id: "q6", title: "Notification System", concept: "Kafka, async processing, retries", difficulty: "Medium" },
        { id: "q7", title: "Google Docs (Collaborative Editor)", concept: "Concurrent editing, synchronization", difficulty: "Hard" }
      ]
    },
    {
      id: "grp-3",
      group: "Group 3 – Media and Storage",
      items: [
        { id: "q8", title: "YouTube / Netflix", concept: "Video processing, object storage, CDN", difficulty: "Hard" },
        { id: "q9", title: "Google Drive / Dropbox", concept: "File upload, chunking, synchronization", difficulty: "Hard" },
        { id: "q10", title: "Instagram / Twitter News Feed", concept: "Fan-out, feed generation, caching", difficulty: "Hard" }
      ]
    },
    {
      id: "grp-4",
      group: "Group 4 – Location-based Systems",
      items: [
        { id: "q11", title: "Uber / Ola", concept: "Geospatial indexing, matching, tracking", difficulty: "Hard" }
      ]
    },
    {
      id: "grp-5",
      group: "Group 5 – Transactions and Commerce",
      items: [
        { id: "q12", title: "BookMyShow / Ticketmaster", concept: "Concurrency, seat locking, reservations", difficulty: "Medium" },
        { id: "q13", title: "Payment Gateway", concept: "Idempotency, transaction states, reconciliation", difficulty: "Hard" },
        { id: "q14", title: "Amazon / E-commerce", concept: "Catalog, cart, inventory, order processing", difficulty: "Hard" }
      ]
    },
    {
      id: "grp-6",
      group: "Group 6 – Additional Important Systems",
      items: [
        { id: "q15", title: "Search Autocomplete", concept: "Trie, ranking, caching", difficulty: "Medium" },
        { id: "q16", title: "Logging and Monitoring System", concept: "High-volume ingestion, time-series data", difficulty: "Medium" }
      ]
    },
    {
      id: "grp-optional",
      group: "Optional Practice Systems",
      items: [
        { id: "q17", title: "Distributed Job Scheduler", concept: "Scheduling, workers and retries", difficulty: "Medium" },
        { id: "q18", title: "Real-time Leaderboard", concept: "Ranking, Redis sorted sets and Top-K", difficulty: "Easy" }
      ]
    },
    {
      id: "grp-mocks",
      group: "Mock Interviews (5 Practice Sessions)",
      items: [
        { id: "mock-1", title: "Mock Interview 1", concept: "Full 45-min end-to-end simulation", difficulty: "Exam" },
        { id: "mock-2", title: "Mock Interview 2", concept: "Full 45-min end-to-end simulation", difficulty: "Exam" },
        { id: "mock-3", title: "Mock Interview 3", concept: "Full 45-min end-to-end simulation", difficulty: "Exam" },
        { id: "mock-4", title: "Mock Interview 4", concept: "Full 45-min end-to-end simulation", difficulty: "Exam" },
        { id: "mock-5", title: "Mock Interview 5", concept: "Full 45-min end-to-end simulation", difficulty: "Exam" }
      ]
    }
  ],

  framework: {
    steps: [
      {
        number: 1,
        title: "Requirements Clarification",
        time: "5 mins",
        description: "Always clarify functional and non-functional requirements before jumping into designs.",
        bulletPoints: [
          "Functional: Core features the user can perform (e.g., shorten URL, redirect to original URL).",
          "Non-functional: High availability, low latency (<100ms), read vs write heavy, consistency vs availability.",
          "Out of Scope: Clarify what not to build to prevent scope creep."
        ]
      },
      {
        number: 2,
        title: "Back-of-the-Envelope Estimation",
        time: "4 mins",
        description: "Rough calculations to determine system scale, storage requirements, and throughput.",
        bulletPoints: [
          "Traffic: Daily Active Users (DAU), Read QPS, Write QPS (Read-to-Write ratio).",
          "Storage: Payload size per entry × writes per day × 5 years retention.",
          "Bandwidth: Incoming traffic (write QPS × write size) and outgoing traffic (read QPS × read size)."
        ]
      },
      {
        number: 3,
        title: "API Design",
        time: "4 mins",
        description: "Define core endpoints, request payload parameters, and response structures.",
        bulletPoints: [
          "REST / gRPC signatures (e.g., POST /api/v1/urls, GET /{shortUrl}).",
          "Request headers & parameters: User tokens, idempotency keys, pagination (cursor/limit).",
          "Standard HTTP response status codes: 200 OK, 201 Created, 301/302 Redirect, 429 Too Many Requests."
        ]
      },
      {
        number: 4,
        title: "Database Design & Data Model",
        time: "5 mins",
        description: "Choose the appropriate database technology and outline schemas and indexes.",
        bulletPoints: [
          "SQL vs NoSQL: Relational (PostgreSQL/MySQL) for ACID transactions vs NoSQL (Cassandra/MongoDB/DynamoDB) for scale/loose schema.",
          "Schema & Indexes: Primary keys, foreign keys, secondary indexes for fast lookup queries.",
          "Access Patterns: How frequently tables are joined or queried."
        ]
      },
      {
        number: 5,
        title: "High-Level System Architecture",
        time: "8 mins",
        description: "Draw end-to-end architecture boxes and connections from client to storage.",
        bulletPoints: [
          "Client -> DNS -> CDN (static assets) -> Load Balancer (L7/L4).",
          "Reverse Proxy / API Gateway (Auth, SSL termination, rate limiting).",
          "Application Servers -> Cache (Redis/Memcached) -> Primary & Replica Databases.",
          "Message Queues (Kafka/RabbitMQ) for asynchronous worker processing."
        ]
      },
      {
        number: 6,
        title: "Detailed Deep Dive",
        time: "10 mins",
        description: "Drill into the hardest component, core business logic, and read/write flow.",
        bulletPoints: [
          "Trace step-by-step: Step 1 client sends request -> Step 2 cache lookup -> Step 3 DB fallback.",
          "Deep dive into the 1-2 most critical components (e.g., ID generation algorithm, real-time sync, WebSockets).",
          "Discuss concurrency, race conditions, and distributed locks."
        ]
      },
      {
        number: 7,
        title: "Scalability & Bottlenecks",
        time: "5 mins",
        description: "Identify performance bottlenecks and scale the system horizontally.",
        bulletPoints: [
          "Caching Strategy: Cache-aside, Write-through, Write-back, and eviction policies (LRU/LFU).",
          "Database Scaling: Read replicas, master-slave replication, vertical vs horizontal partitioning (Sharding).",
          "Async Workflows: Decouple heavy computation with message queues and worker pools."
        ]
      },
      {
        number: 8,
        title: "Reliability, Fault Tolerance & Trade-offs",
        time: "4 mins",
        description: "Show real engineering maturity by explaining failure recovery and trade-offs.",
        bulletPoints: [
          "Single Point of Failure (SPOF): Ensure redundant instances across availability zones.",
          "Failover & Circuit Breakers: Automatic failover, graceful degradation, and retry with exponential backoff.",
          "Consistency Trade-offs: CAP theorem application, strong vs eventual consistency."
        ]
      }
    ],

    rules: [
      {
        number: 1,
        title: "Understand Concepts Before Memorizing Architectures",
        description: "Don't blindly copy diagrams. Understand why a message queue or read replica is introduced before placing it."
      },
      {
        number: 2,
        title: "Draw It Yourself Before Checking Solutions",
        description: "Always attempt the problem on paper or Excalidraw first. You only retain trade-offs when you hit the constraints yourself."
      },
      {
        number: 3,
        title: "Always Explain 'Why', Not Just 'What'",
        description: "Interviewers look for reasoned justification: 'I chose Redis because our read-to-write ratio is 100:1 and latency must be sub-10ms'."
      }
    ],

    dailySchedule: [
      { activity: "New Concepts", time: "40 min", desc: "Study 1-2 core fundamental building blocks." },
      { activity: "Revision", time: "20 min", desc: "Quick recall of previous days' concepts without notes." },
      { activity: "HLD Practice", time: "45 min", desc: "Walk through end-to-end design for a target question." },
      { activity: "Architecture Drawing", time: "15 min", desc: "Draw components and verbally practice explaining trade-offs." }
    ]
  }
};

