export const systemDesignData = {
  fundamentals: [
    {
      id: "phase-1",
      phase: "Phase 1",
      title: "Architecture & Scalability Foundations",
      duration: "Week 1",
      description: "Core architectural paradigms, scaling strategies, availability metrics, and estimations.",
      topics: [
        { id: "f1", title: "System Requirements & Estimations (Functional vs Non-functional, QPS, Storage)" },
        { id: "f2", title: "Architectural Styles (Monolith vs Microservices, Stateless vs Stateful)" },
        { id: "f3", title: "Scaling & High Availability (Horizontal scaling, redundancy, fault tolerance, SLA)" },
        { id: "f4", title: "Core Performance Metrics (Latency, throughput, QPS, bottleneck analysis)" }
      ]
    },
    {
      id: "phase-2",
      phase: "Phase 2",
      title: "Networking, APIs & Gateways",
      duration: "Week 2",
      description: "Protocols, API paradigms, load distribution, and edge delivery.",
      topics: [
        { id: "f5", title: "API Paradigms & Protocols (REST, gRPC, GraphQL, WebSockets vs SSE)" },
        { id: "f6", title: "Load Balancing & Service Discovery (L4 vs L7, routing algorithms, service registry)" },
        { id: "f7", title: "API Gateway & Reverse Proxy (Rate limiting, auth offloading, SSL termination)" },
        { id: "f8", title: "Content Delivery Networks (Edge caching, static/dynamic asset delivery)" }
      ]
    },
    {
      id: "phase-3",
      phase: "Phase 3",
      title: "Databases, Storage & Caching",
      duration: "Weeks 3–4",
      description: "Storage paradigms, replication, sharding, caching architectures, and consistency models.",
      topics: [
        { id: "f9", title: "Database Paradigms & Schema Design (SQL vs NoSQL: Relational, document, key-value)" },
        { id: "f10", title: "Object Storage & Media (AWS S3, multipart chunked uploads, video transcoding)" },
        { id: "f11", title: "Database Scaling (Replication, read replicas, sharding, and partitioning)" },
        { id: "f12", title: "Distributed Hashing & Indexing (Consistent hashing, virtual nodes, B-Trees, Geohashing)" },
        { id: "f13", title: "Transactions & Consistency (ACID, CAP & PACELC theorems, optimistic vs pessimistic locking)" },
        { id: "f14", title: "Caching Architecture (Redis, caching patterns, LRU/LFU eviction, stampede & invalidation)" }
      ]
    },
    {
      id: "phase-4",
      phase: "Phase 4",
      title: "Asynchronous & Distributed Systems",
      duration: "Week 5",
      description: "Message brokers, distributed reliability, coordination primitives, and failure tolerance.",
      topics: [
        { id: "f15", title: "Message Queues & Event Streaming (Kafka, Pub/Sub, topics, partitions, consumer groups)" },
        { id: "f16", title: "Distributed Reliability (Idempotency, retries with exponential backoff, DLQ, circuit breakers)" },
        { id: "f17", title: "Distributed Coordination (Leader election, distributed locks, consensus basics)" },
        { id: "f18", title: "Distributed Transactions (Saga pattern: orchestration vs choreography, 2PC)" }
      ]
    },
    {
      id: "phase-5",
      phase: "Phase 5",
      title: "Security & Rate Limiting",
      duration: "Week 6",
      description: "Traffic policing, authentication, authorization, and data security.",
      topics: [
        { id: "f19", title: "Rate Limiting Architecture (Token bucket, leaky bucket, sliding window with Redis)" },
        { id: "f20", title: "Authentication & Authorization (JWT, OAuth2, RBAC, encryption at rest and in transit)" }
      ]
    }
  ],

  questions: [
    {
      id: "grp-1",
      group: "Group 1 – Core Systems",
      items: [
        { id: "q1", title: "Rate Limiter", concept: "Token bucket, sliding window, Redis distributed counters", difficulty: "Medium" },
        { id: "q2", title: "URL Shortener (TinyURL)", concept: "Base62 encoding, caching, redirects, ID generation", difficulty: "Easy" },
        { id: "q3", title: "Distributed Unique ID Generator", concept: "Twitter Snowflake, epoch timestamps, worker IDs", difficulty: "Easy" },
        { id: "q4", title: "Consistent Hashing", concept: "Hash ring, virtual nodes, data partitioning & rebalancing", difficulty: "Medium" },
        { id: "q5", title: "Distributed Key-Value Store", concept: "Replication, quorum consensus, CAP theorem", difficulty: "Medium" },
        { id: "q6", title: "Web Crawler", concept: "Distributed workers, URL frontier, deduplication, queues", difficulty: "Medium" },
        { id: "q7", title: "Notification System", concept: "Kafka, async workers, APNs/FCM, retries & deduplication", difficulty: "Medium" },
        { id: "q8", title: "News Feed System (Twitter / Instagram)", concept: "Fan-out on write/read, timeline generation, caching", difficulty: "Hard" },
        { id: "q9", title: "Search Autocomplete System", concept: "Trie data structure, prefix caching, ranking, Top-K", difficulty: "Medium" }
      ]
    },
    {
      id: "grp-2",
      group: "Group 2 – Real-time and Communication",
      items: [
        { id: "q10", title: "WhatsApp / Chat System", concept: "WebSockets, message delivery, presence", difficulty: "Hard" },
        { id: "q11", title: "Google Docs (Collaborative Editor)", concept: "Concurrent editing, OT / CRDT synchronization", difficulty: "Hard" }
      ]
    },
    {
      id: "grp-3",
      group: "Group 3 – Media and Storage",
      items: [
        { id: "q12", title: "YouTube / Netflix", concept: "Video processing, chunking, object storage, CDN", difficulty: "Hard" },
        { id: "q13", title: "Google Drive / Dropbox", concept: "File upload, chunking, synchronization protocol", difficulty: "Hard" }
      ]
    },
    {
      id: "grp-4",
      group: "Group 4 – Location-based Systems",
      items: [
        { id: "q14", title: "Uber / Ola", concept: "Geospatial indexing, QuadTree, driver-rider matching", difficulty: "Hard" }
      ]
    },
    {
      id: "grp-5",
      group: "Group 5 – Transactions and Commerce",
      items: [
        { id: "q15", title: "BookMyShow / Ticketmaster", concept: "Concurrency control, seat locking, reservations", difficulty: "Medium" },
        { id: "q16", title: "Payment Gateway", concept: "Idempotency, 2PC / Saga, reconciliation", difficulty: "Hard" },
        { id: "q17", title: "Amazon / E-commerce", concept: "Product catalog, cart, inventory, order processing", difficulty: "Hard" }
      ]
    },
    {
      id: "grp-6",
      group: "Group 6 – Large-Scale & Infrastructure Systems",
      items: [
        { id: "q18", title: "Logging and Monitoring System", concept: "High-volume ingestion, time-series data, metrics", difficulty: "Medium" },
        { id: "q19", title: "Distributed Job Scheduler", concept: "Cron scheduling, worker pools, DAG execution", difficulty: "Medium" },
        { id: "q20", title: "Real-time Leaderboard", concept: "Redis Sorted Sets, Top-K, write-heavy ranking", difficulty: "Easy" }
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

