export const systemDesignData = {
  fundamentals: [
    {
      id: "core-fundamentals",
      title: "System Design Fundamentals",
      topics: [
        { id: "f1", title: "Monolith vs Microservices", image: "/images/system-design/fundamentals/fundamentals-1.jpg" },
        { id: "f2", title: "Vertical vs Horizontal Scaling", image: "/images/system-design/fundamentals/fundamentals-1.jpg" },
        { id: "f3", title: "Stateless vs Stateful Architecture", image: "/images/system-design/fundamentals/fundamentals-1.jpg" },
        { id: "f4", title: "Forward & Reverse Proxies", image: "/images/system-design/fundamentals/fundamentals-2.jpg" },
        { id: "f5", title: "Load Balancers", image: "/images/system-design/fundamentals/fundamentals-2.jpg" },
        { id: "f6", title: "REST vs gRPC vs GraphQL", image: "/images/system-design/fundamentals/fundamentals-3.jpg" },
        { id: "f7", title: "WebSockets vs Polling vs SSE", image: "/images/system-design/fundamentals/fundamentals-3.jpg" },
        { id: "f8", title: "SQL vs NoSQL", image: "/images/system-design/fundamentals/fundamentals-4.jpg" },
        { id: "f9", title: "Object Storage", image: "/images/system-design/fundamentals/fundamentals-4.jpg" },
        { id: "f10", title: "Database Replication (Master / Slave)", image: "/images/system-design/fundamentals/fundamentals-4.jpg" },
        { id: "f11", title: "Sharding & Partitioning", image: "/images/system-design/fundamentals/fundamentals-5.jpg" },
        { id: "f12", title: "CAP Theorem", image: "/images/system-design/fundamentals/fundamentals-5.jpg" },
        { id: "f13", title: "Optimistic vs Pessimistic Locking", image: "/images/system-design/fundamentals/fundamentals-5.jpg" },
        { id: "f14", title: "Cache", image: "/images/system-design/fundamentals/fundamentals-6.jpg" },
        { id: "f15", title: "Cache Eviction (LRU vs LFU)", image: "/images/system-design/fundamentals/fundamentals-6.jpg" },
        { id: "f16", title: "Cache Invalidation & Cache Stampede", image: "/images/system-design/fundamentals/fundamentals-7.jpg" },
        { id: "f17", title: "Content Delivery Network (CDN)", image: "/images/system-design/fundamentals/fundamentals-7.jpg" },
        { id: "f18", title: "Message Queues", image: "/images/system-design/fundamentals/fundamentals-8.jpg" },
        { id: "f19", title: "Idempotency", image: "/images/system-design/fundamentals/fundamentals-8.jpg" },
        { id: "f20", title: "Data Centers", image: "/images/system-design/fundamentals/fundamentals-8.jpg" }
      ]
    }
  ],

  questions: [
    {
      id: "grp-1",
      group: "Group 1 – Core Systems",
      items: [
        {
          id: "q1",
          title: "Rate Limiter",
          concept: "Token bucket, sliding window, Redis distributed counters",
          difficulty: "Medium",
          pages: [
            "/images/system-design/rate-limiter/1.png",
            "/images/system-design/rate-limiter/2.png",
            "/images/system-design/rate-limiter/3.png",
            "/images/system-design/rate-limiter/4.png",
            "/images/system-design/rate-limiter/5.png",
            "/images/system-design/rate-limiter/6.png",
            "/images/system-design/rate-limiter/7.png",
            "/images/system-design/rate-limiter/8.png",
            "/images/system-design/rate-limiter/9.png"
          ]
        },
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

