// ── STATE ──────────────────────────────────────────────
function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem('alp') || '{}') || {};
  } catch (_) {
    localStorage.removeItem('alp');
    return {};
  }
}

const S = {
  chapter: 0,
  progress: loadProgress(),
  logs: [],
  logOpen: true
};

// ── CHAPTER DATA ───────────────────────────────────────
const CHAPTERS = [
  { id:0, title:'What is an API?', level:'🟢 Beginner', time:'5 min', content:`
<h1>🌐 What is an API?</h1>
<div class="ch-meta"><span>🟢 Beginner</span><span>⏱ 5 min</span></div>
<p><strong>API</strong> stands for <strong>Application Programming Interface</strong>. It's a set of rules that lets two pieces of software talk to each other.</p>
<div class="tip"><span class="tip-icon">💡</span><p><strong>Analogy:</strong> An API is like a waiter at a restaurant. You (client) order from the menu (API), the waiter takes your request to the kitchen (server), and brings back your food (response). You never need to enter the kitchen.</p></div>
<h2>Why APIs Exist</h2>
<ul><li><strong>Abstraction</strong> — you don't need to know how it works internally</li><li><strong>Reusability</strong> — one API, many apps</li><li><strong>Security</strong> — controlled, structured access to data</li><li><strong>Integration</strong> — connect different systems together</li></ul>
<h2>APIs Are Everywhere</h2>
<ul><li>Login with Google → Google Auth API</li><li>Map on a website → Google Maps API</li><li>Pay online → Stripe API</li><li>Weather in an app → OpenWeather API</li><li>Post a tweet → Twitter/X API</li></ul>
<h2>Types of APIs</h2>
<h3>REST (Most Common)</h3><p>Uses HTTP methods and URLs. Returns JSON. This is what you'll master in this course.</p>
<h3>GraphQL</h3><p>Query exactly the data you need. Created by Meta/Facebook.</p>
<h3>SOAP</h3><p>Older XML-based. Still used in banking and enterprise systems.</p>
<h3>WebSockets</h3><p>Real-time bidirectional. Used in chat apps, live games, dashboards.</p>
<div class="tip ok"><span class="tip-icon">✅</span><p>This course focuses on <strong>REST APIs</strong> — the most widely used type. Once you master REST, the others come naturally.</p></div>
` },
  { id:1, title:'HTTP Protocol', level:'🟢 Beginner', time:'8 min', content:`
<h1>🔗 HTTP Protocol</h1>
<div class="ch-meta"><span>🟢 Beginner</span><span>⏱ 8 min</span></div>
<p><strong>HTTP (HyperText Transfer Protocol)</strong> is the foundation of data communication on the web. REST APIs are built directly on top of it.</p>
<h2>Request → Response</h2>
<p>HTTP is a <strong>request-response protocol</strong>. A client sends a request, the server processes it and sends back a response. The connection then closes (for regular HTTP).</p>
<h2>Anatomy of a Request</h2>
<pre><code>GET /users/1 HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer eyJhbGc...</code></pre>
<ul><li><strong>Method</strong> — what action (GET, POST, etc.)</li><li><strong>Path</strong> — where to send it (/users/1)</li><li><strong>Headers</strong> — metadata (auth, format expectations)</li><li><strong>Body</strong> — data payload (POST/PUT only)</li></ul>
<h2>Anatomy of a Response</h2>
<pre><code>HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "Alice"
}</code></pre>
<ul><li><strong>Status Code</strong> — did it work? (200, 404, 500…)</li><li><strong>Headers</strong> — metadata about the response</li><li><strong>Body</strong> — the actual data returned</li></ul>
<h2>URL Breakdown</h2>
<pre><code>https://api.example.com/v1/users?limit=10&page=2

Protocol:  https://
Domain:    api.example.com
Path:      /v1/users
Query:     limit=10&page=2</code></pre>
<div class="tip"><span class="tip-icon">💡</span><p>Always use <code>https://</code> — it encrypts data in transit. Never send API keys or tokens over plain <code>http://</code>.</p></div>
` },
  { id:2, title:'HTTP Methods (CRUD)', level:'🟢 Beginner', time:'10 min', content:`
<h1>⚡ HTTP Methods</h1>
<div class="ch-meta"><span>🟢 Beginner</span><span>⏱ 10 min</span></div>
<p>HTTP methods tell the server <strong>what action to perform</strong>. They map to CRUD operations.</p>
<h2><span class="badge bg">GET</span> — Read</h2>
<p>Fetch data. No body. Must never change data.</p>
<pre><code>GET /api/users         → list all users
GET /api/users/42      → get user 42
GET /api/users?age=25  → filter by age</code></pre>
<h2><span class="badge bp">POST</span> — Create</h2>
<p>Create a new resource. Body required.</p>
<pre><code>POST /api/users
Content-Type: application/json
{ "name": "Alice", "email": "a@b.com" }</code></pre>
<h2><span class="badge bu">PUT</span> — Replace</h2>
<p>Fully replace a resource. Send all fields.</p>
<pre><code>PUT /api/users/42
{ "name": "Alice", "email": "a@b.com", "age": 30 }</code></pre>
<h2><span class="badge bpa">PATCH</span> — Update</h2>
<p>Partially update. Send only changed fields.</p>
<pre><code>PATCH /api/users/42
{ "name": "Alice Updated" }</code></pre>
<h2><span class="badge bd">DELETE</span> — Delete</h2>
<pre><code>DELETE /api/users/42</code></pre>
<div class="tip warn"><span class="tip-icon">⚠️</span><p><strong>PUT vs PATCH:</strong> PUT replaces the whole object (missing fields may be nulled). PATCH only updates fields you send. Most modern APIs prefer PATCH for updates.</p></div>
<h2>Idempotency</h2>
<p>Calling an idempotent operation twice gives the same result as calling it once.</p>
<ul><li>GET ✅ PUT ✅ DELETE ✅ — idempotent</li><li>POST ❌ PATCH ❌ — not idempotent (may create duplicates)</li></ul>
` },
  { id:3, title:'HTTP Status Codes', level:'🟢 Beginner', time:'8 min', content:`
<h1>🚦 HTTP Status Codes</h1>
<div class="ch-meta"><span>🟢 Beginner</span><span>⏱ 8 min</span></div>
<p>Status codes are 3-digit numbers that tell you the <strong>result of your request</strong>.</p>
<h2>2xx — Success ✅</h2>
<table class="ref"><tr><td>200 OK</td><td>Generic success — GET, PATCH, DELETE</td></tr><tr><td>201 Created</td><td>New resource created — POST</td></tr><tr><td>204 No Content</td><td>Success but no body — DELETE</td></tr></table>
<h2>3xx — Redirection 🔀</h2>
<table class="ref"><tr><td>301 Moved Permanently</td><td>URL changed forever</td></tr><tr><td>302 Found</td><td>Temporary redirect</td></tr></table>
<h2>4xx — Client Errors ❌ (your fault)</h2>
<table class="ref"><tr><td>400 Bad Request</td><td>Invalid data / syntax</td></tr><tr><td>401 Unauthorized</td><td>Not authenticated — missing/bad token</td></tr><tr><td>403 Forbidden</td><td>Authenticated but no permission</td></tr><tr><td>404 Not Found</td><td>Resource doesn't exist</td></tr><tr><td>422 Unprocessable</td><td>Validation failed</td></tr><tr><td>429 Too Many Requests</td><td>Rate limit hit</td></tr></table>
<h2>5xx — Server Errors 💥 (their fault)</h2>
<table class="ref"><tr><td>500 Internal Server Error</td><td>Server bug / crash</td></tr><tr><td>502 Bad Gateway</td><td>Proxy got bad response</td></tr><tr><td>503 Service Unavailable</td><td>Server down / overloaded</td></tr></table>
<div class="tip"><span class="tip-icon">💡</span><p><strong>Quick rule:</strong> 4xx = your fault (wrong request). 5xx = their fault (server broken).</p></div>
` },
  { id:4, title:'Headers & Content Types', level:'🟡 Intermediate', time:'10 min', content:`
<h1>📋 Headers & Content Types</h1>
<div class="ch-meta"><span>🟡 Intermediate</span><span>⏱ 10 min</span></div>
<p>HTTP headers are <strong>key-value pairs</strong> that carry metadata — like labels on a package telling you what's inside and how to handle it.</p>
<h2>Key Request Headers</h2>
<h3>Content-Type</h3><p>Format of the request body you're sending.</p>
<pre><code>Content-Type: application/json
Content-Type: multipart/form-data      // file uploads
Content-Type: application/x-www-form-urlencoded</code></pre>
<h3>Accept</h3><p>Format you want the response in.</p>
<pre><code>Accept: application/json
Accept: */*   // any format is fine</code></pre>
<h3>Authorization</h3>
<pre><code>Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
Authorization: Basic dXNlcjpwYXNz
Authorization: ApiKey your-key-here</code></pre>
<h2>Key Response Headers</h2>
<h3>Rate Limit Headers</h3>
<pre><code>X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1700000000</code></pre>
<h3>CORS Headers</h3>
<pre><code>Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE</code></pre>
<div class="tip"><span class="tip-icon">💡</span><p><strong>CORS</strong> is a browser security feature. When calling an API from JavaScript, the API server must send CORS headers allowing your origin. This is why browser tests sometimes fail while tools like Postman succeed — Postman isn't a browser.</p></div>
<h2>Custom Headers</h2>
<pre><code>X-API-Key: your-key
X-Request-ID: abc-123-xyz
X-Client-Version: 2.1.0</code></pre>
` },
  { id:5, title:'JSON & Request Bodies', level:'🟡 Intermediate', time:'10 min', content:`
<h1>📦 JSON & Request Bodies</h1>
<div class="ch-meta"><span>🟡 Intermediate</span><span>⏱ 10 min</span></div>
<p><strong>JSON (JavaScript Object Notation)</strong> is the universal data format of REST APIs.</p>
<h2>JSON Data Types</h2>
<pre><code>{
  "string":  "hello world",
  "number":  42,
  "float":   3.14,
  "boolean": true,
  "null":    null,
  "array":   [1, 2, 3, "four"],
  "object":  { "nested": "value" }
}</code></pre>
<h2>JSON Rules</h2>
<ul><li>Keys must be in <strong>double quotes</strong></li><li>Strings must be double-quoted (not single)</li><li>No trailing commas</li><li>No comments</li></ul>
<h2>Sending JSON (POST / PUT / PATCH)</h2>
<pre><code>POST /api/products
Content-Type: application/json

{
  "name": "Laptop Pro",
  "price": 1299.99,
  "inStock": true,
  "tags": ["laptop", "portable"]
}</code></pre>
<h2>Common Response Patterns</h2>
<h3>Pagination</h3>
<pre><code>{
  "data": [...],
  "pagination": { "page": 1, "total": 342, "per_page": 20 }
}</code></pre>
<h3>Error</h3>
<pre><code>{
  "error": { "code": "NOT_FOUND", "message": "User not found" }
}</code></pre>
<div class="tip"><span class="tip-icon">💡</span><p>In JavaScript: <code>JSON.parse(str)</code> → object, <code>JSON.stringify(obj)</code> → string. In Python: <code>json.loads(s)</code> and <code>json.dumps(obj)</code>.</p></div>
` },
  { id:6, title:'Authentication', level:'🟡 Intermediate', time:'12 min', content:`
<h1>🔐 Authentication & API Keys</h1>
<div class="ch-meta"><span>🟡 Intermediate</span><span>⏱ 12 min</span></div>
<p>Most real APIs require you to <strong>prove who you are</strong> before accessing protected data.</p>
<h2>1. API Keys</h2>
<p>Simplest method. A unique token tied to your account.</p>
<pre><code>// Header (preferred)
X-API-Key: ak_live_abc123xyz

// Query param (avoid — shows in server logs)
GET /data?api_key=ak_live_abc123xyz</code></pre>
<div class="tip warn"><span class="tip-icon">⚠️</span><p>Never put API keys in frontend code, Git commits, or URLs. Store them server-side in environment variables.</p></div>
<h2>2. Bearer / JWT Tokens</h2>
<p>Most common in modern web apps. User logs in, gets a token, uses it for all requests.</p>
<pre><code>// Step 1: Login
POST /auth/login
{ "email": "user@example.com", "password": "secret" }
→ { "token": "eyJhbGciOiJIUzI1NiJ9..." }

// Step 2: Use token
GET /api/me
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...</code></pre>
<h2>3. Basic Auth</h2>
<pre><code>Authorization: Basic dXNlcjpwYXNzd29yZA==
// = base64("user:password")</code></pre>
<h2>4. OAuth 2.0</h2>
<p>Standard for "Login with Google/GitHub". The user grants your app access to their account on another service.</p>
<pre><code>1. Redirect user → GitHub login page
2. User grants permission
3. GitHub sends back auth code
4. Your server exchanges code → access token
5. Use token in API calls</code></pre>
<div class="tip ok"><span class="tip-icon">✅</span><p>Use <strong>API Keys</strong> for server-to-server. <strong>Bearer/JWT</strong> for web apps with user login. <strong>OAuth 2.0</strong> when accessing third-party user data.</p></div>
` },
  { id:7, title:'Query Parameters', level:'🟡 Intermediate', time:'8 min', content:`
<h1>🔎 Query Parameters & Filtering</h1>
<div class="ch-meta"><span>🟡 Intermediate</span><span>⏱ 8 min</span></div>
<p>Query parameters come after <code>?</code> in the URL and let you <strong>filter, sort, search, and paginate</strong> results.</p>
<h2>Syntax</h2>
<pre><code>https://api.example.com/users?key1=val1&key2=val2
//  First param:  ?
//  More params:  &</code></pre>
<h2>Filtering</h2>
<pre><code>GET /api/users?status=active
GET /api/products?category=electronics&max_price=500</code></pre>
<h2>Pagination</h2>
<pre><code>// Page-based
GET /api/users?page=2&limit=20

// Offset-based
GET /api/users?offset=40&limit=20</code></pre>
<h2>Sorting</h2>
<pre><code>GET /api/products?sort=price&order=asc
GET /api/users?sort=-created_at   // - = descending</code></pre>
<h2>Field Selection</h2>
<pre><code>GET /api/users?fields=id,name,email
// Returns only those fields — smaller payload</code></pre>
<h2>Search</h2>
<pre><code>GET /api/users?search=alice
GET /api/products?q=laptop+pro</code></pre>
<div class="tip"><span class="tip-icon">💡</span><p>Use <code>URLSearchParams</code> in JavaScript to build query strings safely:</p></div>
<pre><code>const q = new URLSearchParams({ search: 'alice', limit: 10 });
fetch('/api/users?' + q)</code></pre>
` },
  { id:8, title:'REST Design Principles', level:'🔴 Advanced', time:'15 min', content:`
<h1>🏗️ REST API Design</h1>
<div class="ch-meta"><span>🔴 Advanced</span><span>⏱ 15 min</span></div>
<p>Good API design makes an API <strong>intuitive, consistent, and a pleasure to use</strong>.</p>
<h2>URL Structure</h2>
<pre><code>✅  GET    /api/v1/users
    POST   /api/v1/users
    GET    /api/v1/users/42
    PATCH  /api/v1/users/42
    DELETE /api/v1/users/42
    GET    /api/v1/users/42/posts

❌  GET /api/getUsers
    POST /api/deleteUser?id=42</code></pre>
<h2>Naming Rules</h2>
<ul><li>Use <strong>nouns</strong>, not verbs (<code>/users</code> not <code>/getUsers</code>)</li><li>Use <strong>plural</strong> (<code>/users</code> not <code>/user</code>)</li><li>Use <strong>lowercase + hyphens</strong> (<code>/blog-posts</code>)</li><li>Nest for relationships (<code>/users/42/orders</code>)</li></ul>
<h2>Versioning</h2>
<pre><code>// URL versioning (most common)
/api/v1/users
/api/v2/users   // breaking changes → bump version</code></pre>
<h2>Consistent Error Format</h2>
<pre><code>{
  "error": {
    "status": 404,
    "code": "USER_NOT_FOUND",
    "message": "No user with ID 42 exists",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}</code></pre>
<div class="tip ok"><span class="tip-icon">✅</span><p>Study <strong>Stripe's API</strong> and <strong>GitHub's API</strong> — widely considered best-in-class REST design. Copy their patterns.</p></div>
` },
  { id:9, title:'Rate Limiting & Errors', level:'🔴 Advanced', time:'10 min', content:`
<h1>🛡️ Rate Limiting & Error Handling</h1>
<div class="ch-meta"><span>🔴 Advanced</span><span>⏱ 10 min</span></div>
<h2>Rate Limiting</h2>
<p>APIs cap how many requests you can make to prevent abuse.</p>
<pre><code>X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 3
X-RateLimit-Reset: 1700000000

// When exceeded:
HTTP 429 Too Many Requests
Retry-After: 3600</code></pre>
<h2>Exponential Backoff</h2>
<pre><code>async function fetchRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const res = await fetch(url);
    if (res.status === 429) {
      await new Promise(r => setTimeout(r, 2**i * 1000));
      continue;  // wait 1s, 2s, 4s...
    }
    return res;
  }
  throw new Error('Max retries exceeded');
}</code></pre>
<h2>Proper Error Handling</h2>
<pre><code>const res = await fetch(url);

// fetch() does NOT throw on 4xx/5xx — check res.ok!
if (!res.ok) {
  const err = await res.json().catch(() => ({}));
  throw new Error(err.message || 'HTTP ' + res.status);
}

const data = await res.json();</code></pre>
<div class="tip warn"><span class="tip-icon">⚠️</span><p><strong>Common mistake:</strong> <code>fetch()</code> only rejects on network errors. A 404 or 500 still resolves — always check <code>response.ok</code>.</p></div>
` },
  { id:10, title:'GraphQL Basics', level:'🔴 Advanced', time:'12 min', content:`
<h1>⬡ GraphQL</h1>
<div class="ch-meta"><span>🔴 Advanced</span><span>⏱ 12 min</span></div>
<p>GraphQL lets clients ask for <strong>exactly the data they need</strong>, nothing more or less.</p>
<h2>REST vs GraphQL</h2>
<pre><code>// REST — fixed shape, multiple round-trips
GET /users/1         // full user object
GET /users/1/posts   // all post fields

// GraphQL — one request, exact shape
POST /graphql
{ user(id:1) { name  posts { title } } }</code></pre>
<h2>Query (Read)</h2>
<pre><code>query {
  user(id: 42) {
    name
    email
    posts(limit: 5) {
      title
      publishedAt
    }
  }
}</code></pre>
<h2>Mutation (Write)</h2>
<pre><code>mutation {
  createUser(input: { name: "Alice", email: "a@b.com" }) {
    id
    createdAt
  }
}</code></pre>
<h2>Subscription (Real-time)</h2>
<pre><code>subscription {
  newMessage(channelId: "abc") {
    id
    text
    author { name }
  }
}</code></pre>
<div class="tip"><span class="tip-icon">💡</span><p>GraphQL is best for complex interconnected data (social, e-commerce). REST is simpler for straightforward CRUD. GitHub, Shopify, and X all offer GraphQL APIs.</p></div>
` },
  { id:11, title:'WebSockets & Real-time', level:'🔴 Advanced', time:'10 min', content:`
<h1>⚡ WebSockets & Real-time</h1>
<div class="ch-meta"><span>🔴 Advanced</span><span>⏱ 10 min</span></div>
<p>HTTP is request-response and closes after each exchange. <strong>WebSockets</strong> keep a persistent connection open — either side can send messages at any time.</p>
<h2>When to Use</h2>
<ul><li>💬 Chat apps</li><li>📊 Live dashboards / stock prices</li><li>🎮 Multiplayer games</li><li>🔔 Push notifications</li><li>📝 Collaborative editing (Google Docs)</li></ul>
<h2>WebSocket in JavaScript</h2>
<pre><code>const ws = new WebSocket('wss://api.example.com/ws');

ws.onopen    = () => ws.send(JSON.stringify({ type: 'subscribe', ch: 'prices' }));
ws.onmessage = e  => console.log('Received:', JSON.parse(e.data));
ws.onclose   = () => console.log('Disconnected');
ws.onerror   = e  => console.error(e);

// Send at any time:
ws.send(JSON.stringify({ type: 'message', text: 'Hello!' }));</code></pre>
<h2>Server-Sent Events (SSE)</h2>
<p>One-way server → client streaming. Simpler than WebSockets.</p>
<pre><code>const es = new EventSource('/api/stream');
es.onmessage = e => console.log(e.data);

// Server sends:
data: {"price": 42.10}
data: {"price": 42.15}</code></pre>
<div class="tip ok"><span class="tip-icon">✅</span><p><strong>Which to use:</strong> WebSockets for two-way real-time (chat, games). SSE for one-way streams (feeds, progress bars). Long polling for simple infrequent updates.</p></div>
` }
];

// ── QUICK EXAMPLES ─────────────────────────────────────
const EXAMPLES = [
  // GET
  { g:'GET',    name:'Single post',            method:'GET',    url:'https://jsonplaceholder.typicode.com/posts/1',                      body:'', hdrs:[] },
  { g:'GET',    name:'All posts',              method:'GET',    url:'https://jsonplaceholder.typicode.com/posts',                        body:'', hdrs:[] },
  { g:'GET',    name:'Filter: userId=1',       method:'GET',    url:'https://jsonplaceholder.typicode.com/posts?userId=1',               body:'', hdrs:[] },
  { g:'GET',    name:'Paginate: page 2',       method:'GET',    url:'https://jsonplaceholder.typicode.com/posts?_page=2&_limit=5',       body:'', hdrs:[] },
  { g:'GET',    name:'All users',              method:'GET',    url:'https://jsonplaceholder.typicode.com/users',                        body:'', hdrs:[] },
  { g:'GET',    name:"User's posts",           method:'GET',    url:'https://jsonplaceholder.typicode.com/users/1/posts',                body:'', hdrs:[] },
  { g:'GET',    name:'Completed todos',        method:'GET',    url:'https://jsonplaceholder.typicode.com/todos?completed=true&_limit=5', body:'', hdrs:[] },
  { g:'GET',    name:'Pikachu (PokéAPI)',       method:'GET',    url:'https://pokeapi.co/api/v2/pokemon/pikachu',                        body:'', hdrs:[] },
  { g:'GET',    name:'Fire type moves',        method:'GET',    url:'https://pokeapi.co/api/v2/type/fire',                              body:'', hdrs:[] },
  { g:'GET',    name:'Germany (Countries)',    method:'GET',    url:'https://restcountries.com/v3.1/alpha/de',                          body:'', hdrs:[] },
  { g:'GET',    name:'GitHub: octocat',        method:'GET',    url:'https://api.github.com/users/octocat',                             body:'', hdrs:[] },
  { g:'GET',    name:'GitHub: repo info',      method:'GET',    url:'https://api.github.com/repos/torvalds/linux',                      body:'', hdrs:[] },
  // POST
  { g:'POST',   name:'Create post',            method:'POST',   url:'https://jsonplaceholder.typicode.com/posts',
    body:'{\n  "title": "My First API Post",\n  "body": "Learning APIs is fun!",\n  "userId": 1\n}',
    hdrs:[['Content-Type','application/json']] },
  { g:'POST',   name:'Create user',            method:'POST',   url:'https://jsonplaceholder.typicode.com/users',
    body:'{\n  "name": "Alice Smith",\n  "username": "alice",\n  "email": "alice@example.com"\n}',
    hdrs:[['Content-Type','application/json']] },
  { g:'POST',   name:'Create comment',         method:'POST',   url:'https://jsonplaceholder.typicode.com/comments',
    body:'{\n  "postId": 1,\n  "name": "Great post!",\n  "email": "reader@example.com",\n  "body": "Really helpful, thanks!"\n}',
    hdrs:[['Content-Type','application/json']] },
  { g:'POST',   name:'HTTPBin: inspect body',  method:'POST',   url:'https://httpbin.org/post',
    body:'{\n  "message": "hello world",\n  "number": 42,\n  "tags": ["api", "test"]\n}',
    hdrs:[['Content-Type','application/json']] },
  // PUT
  { g:'PUT',    name:'Replace post (full)',    method:'PUT',    url:'https://jsonplaceholder.typicode.com/posts/1',
    body:'{\n  "id": 1,\n  "title": "Completely Replaced Title",\n  "body": "All fields replaced",\n  "userId": 1\n}',
    hdrs:[['Content-Type','application/json']] },
  // PATCH
  { g:'PATCH',  name:'Update title only',      method:'PATCH',  url:'https://jsonplaceholder.typicode.com/posts/1',
    body:'{\n  "title": "Only this field changed"\n}',
    hdrs:[['Content-Type','application/json']] },
  { g:'PATCH',  name:'Update body only',       method:'PATCH',  url:'https://jsonplaceholder.typicode.com/posts/1',
    body:'{\n  "body": "Updated content — title unchanged"\n}',
    hdrs:[['Content-Type','application/json']] },
  // DELETE
  { g:'DELETE', name:'Delete post',            method:'DELETE', url:'https://jsonplaceholder.typicode.com/posts/1',    body:'', hdrs:[] },
  { g:'DELETE', name:'Delete comment',         method:'DELETE', url:'https://jsonplaceholder.typicode.com/comments/1', body:'', hdrs:[] },
  // AUTH
  { g:'AUTH',   name:'Bearer token test',      method:'GET',    url:'https://httpbin.org/bearer',
    body:'', hdrs:[['Authorization','Bearer my-secret-token-123']] },
  { g:'AUTH',   name:'API Key header',         method:'GET',    url:'https://httpbin.org/headers',
    body:'', hdrs:[['X-API-Key','sk_live_abc123xyz'],['Accept','application/json']] },
  { g:'AUTH',   name:'Basic Auth',             method:'GET',    url:'https://httpbin.org/basic-auth/testuser/testpass',
    body:'', hdrs:[['Authorization','Basic dGVzdHVzZXI6dGVzdHBhc3M=']] },
  { g:'AUTH',   name:'Custom + Bearer headers',method:'GET',    url:'https://httpbin.org/headers',
    body:'', hdrs:[['X-Custom-Header','my-value'],['Authorization','Bearer demo-token']] },
  // HEADERS
  { g:'HEADERS',name:'Inspect your headers',   method:'GET',    url:'https://httpbin.org/headers',
    body:'', hdrs:[['X-My-Header','hello'],['Accept','application/json']] },
  { g:'HEADERS',name:'Your IP address',        method:'GET',    url:'https://httpbin.org/ip',        body:'', hdrs:[] },
  { g:'HEADERS',name:'User-Agent info',        method:'GET',    url:'https://httpbin.org/user-agent', body:'', hdrs:[] },
  { g:'HEADERS',name:'HTTPBin GET details',    method:'GET',    url:'https://httpbin.org/get',        body:'', hdrs:[] },
  // STATUS CODES
  { g:'STATUS', name:'200 OK',                 method:'GET',    url:'https://httpbin.org/status/200', body:'', hdrs:[] },
  { g:'STATUS', name:'201 Created',            method:'GET',    url:'https://httpbin.org/status/201', body:'', hdrs:[] },
  { g:'STATUS', name:'204 No Content',         method:'GET',    url:'https://httpbin.org/status/204', body:'', hdrs:[] },
  { g:'STATUS', name:'400 Bad Request',        method:'GET',    url:'https://httpbin.org/status/400', body:'', hdrs:[] },
  { g:'STATUS', name:'401 Unauthorized',       method:'GET',    url:'https://httpbin.org/status/401', body:'', hdrs:[] },
  { g:'STATUS', name:'403 Forbidden',          method:'GET',    url:'https://httpbin.org/status/403', body:'', hdrs:[] },
  { g:'STATUS', name:'404 Not Found',          method:'GET',    url:'https://httpbin.org/status/404', body:'', hdrs:[] },
  { g:'STATUS', name:'429 Rate Limited',       method:'GET',    url:'https://httpbin.org/status/429', body:'', hdrs:[] },
  { g:'STATUS', name:'500 Server Error',       method:'GET',    url:'https://httpbin.org/status/500', body:'', hdrs:[] },
];

// ── DOCS DATA ──────────────────────────────────────────
const DOCS = [
  { cat:'🟢 GET — Read Data', items:[
    { icon:'🟢', title:'GET Request', wide:true,
      tries:['Single post','All posts','Filter: userId=1','Paginate: page 2','GitHub: octocat'],
      html:`<p><strong>GET</strong> retrieves data from the server. It is <strong>read-only</strong> and must never modify data.</p>
<h4>URL Patterns</h4>
<pre><code>GET /api/posts           → list all posts
GET /api/posts/1         → get post with ID 1
GET /api/users/1/posts   → posts belonging to user 1</code></pre>
<h4>Query Parameters — Filter / Sort / Paginate / Search</h4>
<pre><code>GET /posts?userId=1                      → filter by field
GET /posts?_page=2&_limit=10             → pagination
GET /posts?_sort=title&_order=asc        → sorting
GET /posts?title_like=api                → search (contains)
GET /users?email=alice@example.com       → exact match</code></pre>
<h4>Typical Response</h4>
<pre><code>HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "title": "Getting Started with APIs",
  "body": "...",
  "userId": 1
}</code></pre>
<h4>Rules</h4>
<ul>
  <li>No request body — parameters go in the URL</li>
  <li>Returns <span class="c2">200 OK</span> on success</li>
  <li>Idempotent — same call always returns same result</li>
  <li>Safe — guaranteed not to modify data</li>
  <li>Can be cached by browsers and proxies</li>
</ul>` }
  ]},

  { cat:'🔵 POST — Create Data', items:[
    { icon:'🔵', title:'POST Request', wide:true,
      tries:['Create post','Create user','Create comment','HTTPBin: inspect body'],
      html:`<p><strong>POST</strong> creates a new resource on the server. Data is sent in the request <strong>body</strong>.</p>
<h4>Syntax</h4>
<pre><code>POST /api/posts
Content-Type: application/json

{
  "title": "My First Post",
  "body": "Hello API world!",
  "userId": 1
}</code></pre>
<h4>Successful Response</h4>
<pre><code>HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/posts/101

{
  "id": 101,
  "title": "My First Post",
  "body": "Hello API world!",
  "userId": 1
}</code></pre>
<h4>Rules</h4>
<ul>
  <li>Always set <code>Content-Type: application/json</code> when sending JSON</li>
  <li>Returns <span class="c2">201 Created</span> on success (not 200)</li>
  <li><strong>Not idempotent</strong> — calling twice creates two separate resources</li>
  <li>Response body contains the newly created object with its server-assigned ID</li>
  <li>The <code>Location</code> header points to the new resource URL</li>
</ul>
<h4>Common Errors</h4>
<ul>
  <li><span class="c4">400</span> Missing Content-Type → server may reject the body</li>
  <li><span class="c4">400</span> Invalid JSON syntax → fix your JSON formatting</li>
  <li><span class="c4">422</span> Missing required fields → check API docs for required fields</li>
  <li><span class="c4">409</span> Conflict → e.g. duplicate email when creating a user</li>
</ul>` }
  ]},

  { cat:'🟡 PUT & PATCH — Update Data', items:[
    { icon:'🟡', title:'PUT — Full Replacement',
      tries:['Replace post (full)'],
      html:`<p><strong>PUT</strong> completely replaces an existing resource. You must send <strong>all fields</strong>.</p>
<pre><code>PUT /api/posts/1
Content-Type: application/json

{
  "id": 1,
  "title": "Brand New Title",
  "body": "Completely new body",
  "userId": 1
}</code></pre>
<h4>Response</h4>
<pre><code>HTTP/1.1 200 OK
{ "id": 1, "title": "Brand New Title", ... }</code></pre>
<h4>Warning</h4>
<ul>
  <li>⚠️ Fields you omit may be set to <code>null</code> or deleted</li>
  <li>Always send the complete object</li>
  <li>Idempotent — calling twice with same data gives same result</li>
</ul>` },
    { icon:'🟠', title:'PATCH — Partial Update',
      tries:['Update title only','Update body only'],
      html:`<p><strong>PATCH</strong> updates only the fields you send. All other fields remain unchanged.</p>
<pre><code>PATCH /api/posts/1
Content-Type: application/json

{
  "title": "Only title changed"
}
// body, userId etc stay exactly as they were</code></pre>
<h4>Response</h4>
<pre><code>HTTP/1.1 200 OK
{
  "id": 1,
  "title": "Only title changed",
  "body": "original body still here",
  "userId": 1
}</code></pre>
<h4>PUT vs PATCH</h4>
<table>
  <tr><td>PUT</td><td>Replace entire object — send ALL fields or risk data loss</td></tr>
  <tr><td>PATCH</td><td>Partial update — send only what changed (preferred)</td></tr>
</table>` }
  ]},

  { cat:'🔴 DELETE — Remove Data', items:[
    { icon:'🔴', title:'DELETE Request',
      tries:['Delete post','Delete comment'],
      html:`<p><strong>DELETE</strong> removes a resource from the server permanently.</p>
<pre><code>DELETE /api/posts/1
// No body needed</code></pre>
<h4>Possible Responses</h4>
<table>
  <tr><td class="c2">200 OK</td><td>Deleted successfully — response has body (often the deleted object)</td></tr>
  <tr><td class="c2">204 No Content</td><td>Deleted successfully — no response body (most common)</td></tr>
  <tr><td class="c4">404 Not Found</td><td>Resource didn't exist</td></tr>
  <tr><td class="c4">403 Forbidden</td><td>You don't have permission to delete this</td></tr>
</table>
<h4>Notes</h4>
<ul>
  <li>No request body needed</li>
  <li>Idempotent — deleting the same resource twice gives 204 then 404</li>
  <li>Some APIs do "soft delete" (mark as deleted) instead of actually removing</li>
</ul>` }
  ]},

  { cat:'🔐 Authentication', items:[
    { icon:'🗝️', title:'API Keys',
      tries:['API Key header','Inspect your headers'],
      html:`<p>A secret token tied to your account. The simplest auth method.</p>
<h4>Option 1: Header (Recommended)</h4>
<pre><code>GET /api/data
X-API-Key: sk_live_abc123xyz</code></pre>
<h4>Option 2: Query Param (Avoid)</h4>
<pre><code>GET /api/data?api_key=sk_live_abc123xyz
⚠️  Appears in server logs, browser history, URLs</code></pre>
<h4>Best Practices</h4>
<ul>
  <li>Store in environment variables (<code>process.env.API_KEY</code>)</li>
  <li>Never hardcode in source code or commit to Git</li>
  <li>Use different keys for development vs production</li>
  <li>Rotate immediately if exposed</li>
  <li>Restrict key permissions to only what's needed</li>
</ul>` },
    { icon:'🎫', title:'Bearer Token / JWT',
      tries:['Bearer token test'],
      html:`<p>A signed token issued after login. Used by the majority of modern APIs.</p>
<h4>Step 1 — Login</h4>
<pre><code>POST /auth/login
Content-Type: application/json

{ "email": "user@example.com", "password": "secret" }

→ Response:
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.abc",
  "expires_in": 3600
}</code></pre>
<h4>Step 2 — Use Token</h4>
<pre><code>GET /api/me
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjF9.abc</code></pre>
<h4>JWT Structure</h4>
<pre><code>eyJhbGciOiJIUzI1NiJ9  ←  header (algorithm)
.eyJ1c2VySWQiOjF9     ←  payload (user data, base64)
.abc123signature       ←  signature (tamper-proof)</code></pre>
<ul>
  <li>Decode payload at <strong>jwt.io</strong> to inspect claims</li>
  <li>Never store tokens in localStorage in production — use httpOnly cookies</li>
  <li>Tokens expire — refresh using a refresh token endpoint</li>
</ul>` },
    { icon:'🔑', title:'Basic Auth',
      tries:['Basic Auth'],
      html:`<p>Username + password encoded in Base64. Simple but older — use Bearer for new projects.</p>
<h4>How It Works</h4>
<pre><code>// Combine with colon and base64 encode
btoa("testuser:testpass") = "dGVzdHVzZXI6dGVzdHBhc3M="

// Send in header
Authorization: Basic dGVzdHVzZXI6dGVzdHBhc3M=</code></pre>
<h4>JavaScript Example</h4>
<pre><code>const creds = btoa('username:password');
fetch('/api/data', {
  headers: { 'Authorization': 'Basic ' + creds }
});</code></pre>
<h4>Important Warnings</h4>
<ul>
  <li>⚠️ Base64 is <strong>not encryption</strong> — it can be decoded instantly</li>
  <li>Must always use over <strong>HTTPS</strong>, never plain HTTP</li>
  <li>Not recommended for user-facing APIs — use JWT/OAuth instead</li>
  <li>OK for simple server-to-server or internal tools</li>
</ul>` },
    { icon:'🌐', title:'OAuth 2.0',
      tries:[],
      html:`<p>The standard for "Login with Google / GitHub / Facebook". Lets users grant your app access to their account on a third-party service.</p>
<h4>Authorization Code Flow</h4>
<pre><code>1. User clicks "Login with GitHub"
2. Redirect to GitHub:
   https://github.com/login/oauth/authorize
   ?client_id=YOUR_ID&redirect_uri=YOUR_CALLBACK
3. User grants permission
4. GitHub redirects back with code:
   https://yourapp.com/callback?code=abc123
5. Your server exchanges code for access_token:
   POST https://github.com/login/oauth/access_token
   { code, client_id, client_secret }
6. Use token in API calls:
   GET /user
   Authorization: Bearer {access_token}</code></pre>
<h4>Grant Types</h4>
<table>
  <tr><td>Authorization Code</td><td>Web apps — most secure</td></tr>
  <tr><td>PKCE</td><td>Mobile / SPA apps — no client secret</td></tr>
  <tr><td>Client Credentials</td><td>Server-to-server — no user involved</td></tr>
  <tr><td>Implicit</td><td>Legacy — avoid in new projects</td></tr>
</table>` }
  ]},

  { cat:'📋 Headers Complete Reference', items:[
    { icon:'📤', title:'Request Headers',
      tries:['Inspect your headers','Custom + Bearer headers'],
      html:`<h4>Content-Type — Format of Body You're Sending</h4>
<pre><code>Content-Type: application/json
Content-Type: multipart/form-data       // file uploads
Content-Type: application/x-www-form-urlencoded</code></pre>
<h4>Accept — Format You Want Back</h4>
<pre><code>Accept: application/json
Accept: application/xml
Accept: */*     // any format is fine</code></pre>
<h4>Authorization — Auth Credentials</h4>
<pre><code>Authorization: Bearer {jwt_token}
Authorization: Basic {base64(user:pass)}
Authorization: ApiKey {your_key}</code></pre>
<h4>Other Common Request Headers</h4>
<table>
  <tr><td>User-Agent</td><td>Identifies your app (MyApp/2.0)</td></tr>
  <tr><td>Accept-Language</td><td>Preferred response language (en-US)</td></tr>
  <tr><td>Cache-Control</td><td>Caching hints (no-cache, max-age=3600)</td></tr>
  <tr><td>If-None-Match</td><td>Conditional GET using ETag</td></tr>
  <tr><td>X-Request-ID</td><td>Unique ID for request tracing</td></tr>
</table>` },
    { icon:'📥', title:'Response Headers',
      tries:['Inspect your headers'],
      html:`<h4>Rate Limiting Headers</h4>
<pre><code>X-RateLimit-Limit: 1000       // max requests per window
X-RateLimit-Remaining: 987    // how many you have left
X-RateLimit-Reset: 1700000000 // unix timestamp — resets at
Retry-After: 3600             // seconds to wait (on 429)</code></pre>
<h4>CORS Headers</h4>
<pre><code>Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400</code></pre>
<h4>Other Common Response Headers</h4>
<table>
  <tr><td>Content-Type</td><td>Format of the response body</td></tr>
  <tr><td>Content-Length</td><td>Size of response body in bytes</td></tr>
  <tr><td>Location</td><td>URL of newly created resource (201)</td></tr>
  <tr><td>ETag</td><td>Version fingerprint for caching</td></tr>
  <tr><td>Last-Modified</td><td>When the resource last changed</td></tr>
  <tr><td>Cache-Control</td><td>How long client should cache (max-age)</td></tr>
</table>` }
  ]},

  { cat:'🚦 Status Codes Complete', items:[
    { icon:'✅', title:'2xx — Success',
      tries:['200 OK','201 Created','204 No Content'],
      html:`<table>
  <tr><td class="c2">200 OK</td><td>Generic success — GET, PATCH, DELETE</td></tr>
  <tr><td class="c2">201 Created</td><td>New resource made — POST (includes Location header)</td></tr>
  <tr><td class="c2">202 Accepted</td><td>Request accepted, processing not yet done (async)</td></tr>
  <tr><td class="c2">204 No Content</td><td>Success but no body — typical for DELETE</td></tr>
  <tr><td class="c2">206 Partial Content</td><td>Partial response (range/streaming)</td></tr>
</table>` },
    { icon:'🔀', title:'3xx — Redirects',
      tries:[],
      html:`<table>
  <tr><td class="c3">301 Moved Permanently</td><td>URL changed forever — update your links</td></tr>
  <tr><td class="c3">302 Found</td><td>Temporary redirect</td></tr>
  <tr><td class="c3">304 Not Modified</td><td>Use your cached version (ETag matched)</td></tr>
  <tr><td class="c3">307 Temporary Redirect</td><td>Same as 302 but keep the HTTP method</td></tr>
</table>` },
    { icon:'❌', title:'4xx — Client Errors',
      tries:['400 Bad Request','401 Unauthorized','403 Forbidden','404 Not Found','429 Rate Limited'],
      html:`<p>Something wrong with <strong>your request</strong>.</p>
<table>
  <tr><td class="c4">400 Bad Request</td><td>Invalid syntax, malformed JSON, bad data</td></tr>
  <tr><td class="c4">401 Unauthorized</td><td>Not authenticated — missing or invalid token</td></tr>
  <tr><td class="c4">403 Forbidden</td><td>Authenticated but lacking permission</td></tr>
  <tr><td class="c4">404 Not Found</td><td>Resource doesn't exist at this URL</td></tr>
  <tr><td class="c4">405 Method Not Allowed</td><td>Wrong HTTP method (e.g. DELETE on read-only)</td></tr>
  <tr><td class="c4">409 Conflict</td><td>State conflict (duplicate email, version mismatch)</td></tr>
  <tr><td class="c4">410 Gone</td><td>Resource permanently deleted (404 but permanent)</td></tr>
  <tr><td class="c4">422 Unprocessable</td><td>Validation failed — required field missing etc.</td></tr>
  <tr><td class="c4">429 Too Many Requests</td><td>Rate limit hit — wait and retry</td></tr>
</table>` },
    { icon:'💥', title:'5xx — Server Errors',
      tries:['500 Server Error'],
      html:`<p>The server failed — <strong>not your fault</strong>.</p>
<table>
  <tr><td class="c4">500 Internal Server Error</td><td>Unhandled exception / bug in server code</td></tr>
  <tr><td class="c4">501 Not Implemented</td><td>Feature not yet built on this server</td></tr>
  <tr><td class="c4">502 Bad Gateway</td><td>Reverse proxy got bad response from upstream</td></tr>
  <tr><td class="c4">503 Service Unavailable</td><td>Server overloaded or in maintenance</td></tr>
  <tr><td class="c4">504 Gateway Timeout</td><td>Upstream took too long to respond</td></tr>
</table>` }
  ]},

  { cat:'🔬 Public APIs to Practice', items:[
    { icon:'📋', title:'JSONPlaceholder',
      tries:['Single post','All posts','Create post','Replace post (full)','Update title only','Delete post'],
      html:`<p>Free fake REST API — no auth, no setup. Perfect for beginners.</p>
<table>
  <tr><td>GET /posts</td><td>100 fake posts</td></tr>
  <tr><td>GET /users</td><td>10 users with addresses</td></tr>
  <tr><td>GET /comments</td><td>500 comments</td></tr>
  <tr><td>GET /todos</td><td>200 to-do items</td></tr>
  <tr><td>GET /albums</td><td>100 albums</td></tr>
</table>
<p style="margin-top:8px;font-size:12px;color:var(--text-muted)">⚠️ Write ops (POST/PUT/DELETE) succeed but don't actually persist data.</p>` },
    { icon:'🔬', title:'HTTPBin',
      tries:['Inspect your headers','Bearer token test','200 OK','404 Not Found','HTTPBin: inspect body'],
      html:`<p>Echoes back your request details. Best tool for learning how requests work.</p>
<table>
  <tr><td>GET /get</td><td>See your full GET request</td></tr>
  <tr><td>POST /post</td><td>See your POST body echoed back</td></tr>
  <tr><td>GET /headers</td><td>See all your headers</td></tr>
  <tr><td>GET /bearer</td><td>Test Bearer token auth</td></tr>
  <tr><td>GET /ip</td><td>Your current IP</td></tr>
  <tr><td>GET /user-agent</td><td>Your browser's User-Agent</td></tr>
  <tr><td>GET /status/{code}</td><td>Force any HTTP status code</td></tr>
  <tr><td>GET /delay/{n}</td><td>Delayed response in seconds</td></tr>
  <tr><td>GET /basic-auth/{u}/{p}</td><td>Basic auth endpoint</td></tr>
</table>` },
    { icon:'⚡', title:'PokéAPI',
      tries:['Pikachu (PokéAPI)','Fire type moves'],
      html:`<p>Free Pokémon data. Great for practicing nested JSON and data parsing. No auth.</p>
<table>
  <tr><td>GET /api/v2/pokemon/{name}</td><td>Pokémon stats, moves, types</td></tr>
  <tr><td>GET /api/v2/type/{type}</td><td>All Pokémon of a type</td></tr>
  <tr><td>GET /api/v2/move/{name}</td><td>Move details</td></tr>
  <tr><td>GET /api/v2/ability/{name}</td><td>Ability description</td></tr>
</table>` },
    { icon:'🌍', title:'REST Countries',
      tries:['Germany (Countries)'],
      html:`<p>Country data — flags, capitals, populations, currencies. No auth.</p>
<table>
  <tr><td>GET /v3.1/all</td><td>All ~250 countries</td></tr>
  <tr><td>GET /v3.1/alpha/de</td><td>By ISO country code</td></tr>
  <tr><td>GET /v3.1/name/france</td><td>By name (partial match)</td></tr>
  <tr><td>GET /v3.1/region/europe</td><td>By region</td></tr>
  <tr><td>GET /v3.1/currency/usd</td><td>By currency</td></tr>
</table>` },
    { icon:'🐙', title:'GitHub API',
      tries:['GitHub: octocat','GitHub: repo info'],
      html:`<p>Public endpoints need no auth. Excellent for real-world pagination and filtering.</p>
<table>
  <tr><td>GET /users/{username}</td><td>User profile</td></tr>
  <tr><td>GET /repos/{owner}/{repo}</td><td>Repository info</td></tr>
  <tr><td>GET /repos/{owner}/{repo}/issues</td><td>Issues with pagination</td></tr>
  <tr><td>GET /search/users?q={name}</td><td>Search users</td></tr>
  <tr><td>GET /search/repositories?q={q}</td><td>Search repos</td></tr>
</table>` },
  ]},

  { cat:'🛤️ Learning Roadmap', items:[
    { icon:'🌱', title:'Beginner  0→40%', desc:'', steps:['1. What is an API?','2. HTTP Protocol Basics','3. HTTP Methods (GET, POST, PUT, DELETE)','4. HTTP Status Codes (200, 404, 500)','5. Practice: JSONPlaceholder (all methods)'] },
    { icon:'🌿', title:'Intermediate  40→75%', desc:'', steps:['6. Headers & Content-Type','7. JSON & Request Bodies','8. Authentication: API Keys, Bearer/JWT, Basic','9. Query Parameters: filter, paginate, sort','10. Practice: HTTPBin, PokéAPI, GitHub API'] },
    { icon:'🌳', title:'Advanced  75→100%', desc:'', steps:['11. REST API Design Principles','12. Rate Limiting & Retry Logic','13. GraphQL Basics','14. WebSockets & Real-time APIs','15. Build & document your own REST API'] },
  ]},
];

// ── INIT ───────────────────────────────────────────────
function init() {
  renderSidebar();
  renderChapter(0);
  renderExamples();
  renderDocs('');
  updateProgress();
  updateMethodColor();
  addKV('params-ed','key','value');
  addKV('headers-ed','Header-Name','value');
}

// ── SIDEBAR ────────────────────────────────────────────
function renderSidebar() {
  const el = document.getElementById('sidebar-inner');
  el.innerHTML = '<div class="sidebar-title">Learning Path</div>';
  CHAPTERS.forEach((ch, i) => {
    const done = S.progress[ch.id];
    const active = S.chapter === ch.id;
    const d = document.createElement('div');
    d.className = 'ch-item' + (active ? ' active' : '') + (done ? ' done' : '');
    d.onclick = () => { goChapter(ch.id); showSection('learn'); };
    d.innerHTML = `<div class="ch-num">${done ? '✓' : i+1}</div><div class="ch-label">${ch.title}</div>`;
    el.appendChild(d);
  });
}

function renderChapter(id) {
  S.chapter = id;
  const ch = CHAPTERS.find(c => c.id === id);
  const prev = CHAPTERS[id - 1];
  const next = CHAPTERS[id + 1];
  const wrap = document.getElementById('chapter-content');
  wrap.innerHTML = ch.content + `
    <div class="ch-nav">
      <div>${prev ? `<button class="btn btn-s" onclick="goChapter(${prev.id})">← ${prev.title}</button>` : '<span></span>'}</div>
      <div style="display:flex;gap:8px;align-items:center">
        ${!S.progress[id]
          ? `<button class="btn btn-ok" onclick="markDone(${id})">✓ Mark Done</button>`
          : '<span style="color:var(--success);font-size:13px">✓ Completed</span>'}
        ${next
          ? `<button class="btn btn-p" onclick="goChapter(${next.id})">Next: ${next.title} →</button>`
          : '<span style="color:var(--success);font-weight:600">🎉 You finished the course!</span>'}
      </div>
    </div>`;
  wrap.querySelectorAll('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn'; btn.textContent = 'Copy';
    btn.onclick = () => {
      navigator.clipboard.writeText(pre.querySelector('code')?.textContent || pre.textContent);
      btn.textContent = '✓'; setTimeout(() => btn.textContent = 'Copy', 1800);
    };
    pre.appendChild(btn);
  });
  renderSidebar();
}

function goChapter(id) {
  renderChapter(id);
  document.getElementById('main-content').scrollTop = 0;
}

function markDone(id) {
  S.progress[id] = true;
  try { localStorage.setItem('alp', JSON.stringify(S.progress)); } catch (_) {}
  updateProgress();
  const next = CHAPTERS[id + 1];
  if (next) goChapter(next.id); else renderChapter(id);
}

function updateProgress() {
  const done = Object.keys(S.progress).length;
  const total = CHAPTERS.length;
  const pct = Math.round(done / total * 100);
  document.getElementById('prog-text').textContent = `${done} / ${total}`;
  document.getElementById('prog-pct').textContent = `${pct}%`;
  document.getElementById('prog-fill').style.width = pct + '%';
}

// ── NAV ────────────────────────────────────────────────
function showSection(name) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.getElementById('section-' + name).classList.add('active');
  document.getElementById('nav-' + name).classList.add('active');
  document.getElementById('sidebar').style.display = name === 'learn' ? '' : 'none';
}

// ── TESTER TABS ────────────────────────────────────────
function switchTab(name, btn) {
  const pane = document.getElementById('tab-' + name);
  if (!pane) return;

  const paneGroup = pane.parentElement;
  const tabBar = paneGroup?.querySelector(':scope > .tabs');

  paneGroup?.querySelectorAll(':scope > .tab-pane').forEach(p => p.classList.remove('active'));
  tabBar?.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  pane.classList.add('active');

  const activeBtn = btn || Array.from(tabBar?.querySelectorAll('.tab-btn') || [])
    .find(b => b.textContent.trim().toLowerCase() === name);
  activeBtn?.classList.add('active');
}

function switchResTab(name) {
  document.getElementById('rt-body').style.display = name === 'body' ? 'block' : 'none';
  document.getElementById('rt-hdrs').style.display = name === 'hdrs' ? 'block' : 'none';
  document.getElementById('rt-body-btn').classList.toggle('active', name === 'body');
  document.getElementById('rt-hdrs-btn').classList.toggle('active', name === 'hdrs');
}

// ── KV EDITOR ─────────────────────────────────────────
function addKV(id, kp, vp) {
  const ed = document.getElementById(id);
  const row = document.createElement('div');
  row.className = 'kv-row';
  row.innerHTML = `<input class="kv-inp" placeholder="${kp}"><input class="kv-inp" placeholder="${vp}"><button class="kv-del" onclick="this.parentElement.remove()">×</button>`;
  ed.appendChild(row);
}

function getKV(id) {
  const out = {};
  document.querySelectorAll(`#${id} .kv-row`).forEach(r => {
    const [k, v] = r.querySelectorAll('.kv-inp');
    if (k.value.trim()) out[k.value.trim()] = v.value.trim();
  });
  return out;
}

function updateMethodColor() {
  const sel = document.getElementById('req-method');
  const map = { GET:'var(--get)', POST:'var(--post)', PUT:'var(--put)', PATCH:'var(--patch)', DELETE:'var(--delete)' };
  sel.style.color = map[sel.value] || 'var(--text)';
}

function renderAuthFields() {
  const t = document.getElementById('auth-type').value;
  const f = document.getElementById('auth-fields');
  const inp = (id, ph, type='text') => `<input class="kv-inp" style="width:100%;margin-bottom:8px" id="${id}" placeholder="${ph}" type="${type}">`;
  const map = {
    none: '',
    bearer: `<div class="field-lbl">Token</div>${inp('ab','eyJhbGciOiJ...')}`,
    apikey: `<div class="field-lbl">Header Name</div>${inp('akn','X-API-Key')}<div class="field-lbl">Value</div>${inp('akv','your-api-key')}`,
    basic: `<div class="field-lbl">Username</div>${inp('bau','username')}<div class="field-lbl">Password</div>${inp('bap','password','password')}`
  };
  f.innerHTML = map[t] || '';
}

// ── SEND REQUEST ───────────────────────────────────────
async function sendRequest() {
  const method = document.getElementById('req-method').value;
  let url = document.getElementById('req-url').value.trim();
  if (!url) return;
  if (!/^https?:\/\//.test(url)) url = 'https://' + url;

  const params = getKV('params-ed');
  if (Object.keys(params).length) url += (url.includes('?') ? '&' : '?') + new URLSearchParams(params);

  const headers = getKV('headers-ed');
  const auth = document.getElementById('auth-type').value;
  if (auth === 'bearer') { const t = document.getElementById('ab')?.value; if (t) headers['Authorization'] = 'Bearer ' + t; }
  if (auth === 'apikey') { const n = document.getElementById('akn')?.value||'X-API-Key'; const v = document.getElementById('akv')?.value; if(v) headers[n]=v; }
  if (auth === 'basic') { const u = document.getElementById('bau')?.value; const p = document.getElementById('bap')?.value; if(u) headers['Authorization']='Basic '+btoa(u+':'+p); }

  const body = document.getElementById('req-body').value.trim();
  const contentTypeKey = Object.keys(headers).find(k => k.toLowerCase() === 'content-type');
  const contentType = contentTypeKey ? headers[contentTypeKey].toLowerCase() : '';
  const shouldTreatAsJson = body && ['POST','PUT','PATCH'].includes(method) && (!contentType || contentType.includes('json'));
  if (shouldTreatAsJson) {
    try { JSON.parse(body); }
    catch (err) {
      showResError('Invalid JSON body: ' + err.message);
      return;
    }
  }
  if (body && !contentTypeKey) headers['Content-Type'] = 'application/json';

  const btn = document.getElementById('send-btn');
  btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Sending…';

  const t0 = Date.now();
  const log = { method, url, headers, body, status:null, duration:null, response:'', resHeaders:{} };

  try {
    const opts = { method, headers };
    if (body && ['POST','PUT','PATCH'].includes(method)) opts.body = body;

    const res = await fetch(url, opts);
    log.duration = Date.now() - t0;
    log.status = res.status;
    res.headers.forEach((v, k) => log.resHeaders[k] = v);

    const ct = res.headers.get('content-type') || '';
    let resText;
    if (ct.includes('json')) {
      const json = await res.json();
      resText = JSON.stringify(json, null, 2);
      document.getElementById('rt-body').innerHTML = highlight(json);
    } else {
      resText = await res.text();
      document.getElementById('rt-body').textContent = resText;
    }
    log.response = resText;
    document.getElementById('rt-hdrs').textContent = Object.entries(log.resHeaders).map(([k,v])=>`${k}: ${v}`).join('\n');
    showRes(res.status, log.duration, resText);

  } catch (err) {
    log.duration = Date.now() - t0; log.status = 0; log.response = err.message;
    showResError(err.message);
  } finally {
    btn.disabled = false; btn.innerHTML = 'Send ▶';
    addLog(log);
  }
}

function showRes(status, ms, text) {
  document.getElementById('res-ph').style.display = 'none';
  document.getElementById('res-content').style.display = 'block';
  const badge = document.getElementById('res-badge');
  const labels = {200:'OK',201:'Created',204:'No Content',400:'Bad Request',401:'Unauthorized',403:'Forbidden',404:'Not Found',429:'Too Many Requests',500:'Internal Server Error',502:'Bad Gateway',503:'Service Unavailable'};
  badge.textContent = status + ' ' + (labels[status] || '');
  badge.className = 's-badge ' + (status>=500?'s5':status>=400?'s4':status>=300?'s3':'s2');
  document.getElementById('res-time').textContent = ms + 'ms';
  document.getElementById('res-size').textContent = fmt(new TextEncoder().encode(text).length);
}

function showResError(msg) {
  document.getElementById('res-ph').style.display = 'none';
  document.getElementById('res-content').style.display = 'block';
  const b = document.getElementById('res-badge');
  b.textContent = 'Network Error'; b.className = 's-badge s4';
  document.getElementById('res-time').textContent = '';
  document.getElementById('res-size').textContent = '';
  document.getElementById('rt-body').textContent = '⚠️ ' + msg + '\n\nSome APIs block browser requests due to CORS.\nTry: jsonplaceholder.typicode.com or httpbin.org';
}

function highlight(json) {
  // Escape API response text before injecting syntax-highlighted HTML.
  // This prevents malicious JSON strings such as "<img onerror=...>" from becoming executable HTML.
  const safe = esc(JSON.stringify(json, null, 2));
  return safe.replace(/("(?:\\.|[^"\\])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, token => {
    if (/^"/.test(token)) return /:$/.test(token) ? `<span class="jk">${token}</span>` : `<span class="js">${token}</span>`;
    if (/true|false/.test(token)) return `<span class="jb">${token}</span>`;
    if (/null/.test(token)) return `<span class="jnu">${token}</span>`;
    return `<span class="jn">${token}</span>`;
  });
}

function fmt(b) { return b < 1024 ? b + ' B' : b < 1048576 ? (b/1024).toFixed(1) + ' KB' : (b/1048576).toFixed(1) + ' MB'; }

function copyRes() {
  navigator.clipboard.writeText(document.getElementById('rt-body').textContent);
}

// ── EXAMPLES ───────────────────────────────────────────
function renderExamples() {
  const list = document.getElementById('ex-list');
  const mClass = { GET:'bg', POST:'bp', PUT:'bu', PATCH:'bpa', DELETE:'bd' };
  const groups = [...new Set(EXAMPLES.map(e => e.g))];
  groups.forEach(g => {
    const hdr = document.createElement('div');
    hdr.className = 'ex-group-hdr';
    hdr.textContent = g;
    list.appendChild(hdr);
    EXAMPLES.filter(e => e.g === g).forEach(ex => {
      const d = document.createElement('div');
      d.className = 'ex-item';
      d.onclick = () => loadExample(ex);
      d.innerHTML = `<div class="ex-name"><span class="badge ${mClass[ex.method]||''}">${ex.method}</span>${ex.name}</div><div class="ex-url">${ex.url.replace(/^https?:\/\//,'')}</div>`;
      list.appendChild(d);
    });
  });
}

function loadExample(ex) {
  document.getElementById('req-method').value = ex.method;
  document.getElementById('req-url').value = ex.url;
  document.getElementById('req-body').value = ex.body;
  updateMethodColor();
  document.getElementById('headers-ed').innerHTML = '';
  ex.hdrs.forEach(([k,v]) => {
    addKV('headers-ed','Header-Name','value');
    const rows = document.querySelectorAll('#headers-ed .kv-row');
    const last = rows[rows.length-1];
    last.querySelectorAll('.kv-inp')[0].value = k;
    last.querySelectorAll('.kv-inp')[1].value = v;
  });
  showSection('tester');
  ex.body ? switchTab('body') : switchTab('params');
}

function loadExByName(name) {
  const ex = EXAMPLES.find(e => e.name === name);
  if (ex) loadExample(ex);
}

// ── LOG ────────────────────────────────────────────────
function addLog(entry) {
  S.logs.unshift(entry);
  document.getElementById('log-count').textContent = S.logs.length;
  const container = document.getElementById('log-entries');
  if (S.logs.length === 1) container.innerHTML = '';

  const mClass = { GET:'bg', POST:'bp', PUT:'bu', PATCH:'bpa', DELETE:'bd' };
  const sc = entry.status;
  const scColor = !sc ? 'var(--error)' : sc>=500 ? 'var(--error)' : sc>=400 ? 'var(--error)' : sc>=300 ? 'var(--warning)' : 'var(--success)';
  const ts = new Date().toLocaleTimeString('en-US', { hour12:false });
  const lid = 'ld' + Date.now();

  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <div class="log-row" onclick="toggleLD('${lid}')">
      <span class="log-t">${ts}</span>
      <span class="log-m badge ${mClass[entry.method]||''}">${entry.method}</span>
      <span class="log-u" title="${escAttr(entry.url)}">${esc(entry.url)}</span>
      <span class="log-sc" style="color:${scColor}">${sc||'ERR'}</span>
      <span class="log-dur">${entry.duration}ms</span>
    </div>
    <div class="log-detail" id="${lid}">
      <strong style="color:var(--text-dim);font-size:11px">REQUEST</strong>
      <pre>${esc(JSON.stringify({method:entry.method,url:entry.url,headers:entry.headers,body:entry.body||null},null,2))}</pre>
      <strong style="color:var(--text-dim);font-size:11px;margin-top:8px;display:block">RESPONSE ${sc||'ERROR'}</strong>
      <pre>${esc((entry.response||'').slice(0,600))}${(entry.response||'').length>600?'\n…(truncated)':''}</pre>
    </div>`;
  container.insertBefore(wrap, container.firstChild);
}

function toggleLD(id) { document.getElementById(id)?.classList.toggle('show'); }
function toggleLog() {
  S.logOpen = !S.logOpen;
  document.getElementById('log-panel').classList.toggle('collapsed', !S.logOpen);
  document.getElementById('log-chevron').textContent = S.logOpen ? '▼' : '▲';
}
function clearLogs() {
  S.logs = [];
  document.getElementById('log-count').textContent = '0';
  document.getElementById('log-entries').innerHTML = '<div style="padding:18px;text-align:center;color:var(--text-muted);font-size:12px">Log cleared.</div>';
}
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function escAttr(s) { return esc(s).replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }

// ── DOCS ───────────────────────────────────────────────
function renderDocs(filter) {
  const q = (filter || '').toLowerCase();
  const out = document.getElementById('docs-body');
  out.innerHTML = '';

  DOCS.forEach(section => {
    const items = q
      ? section.items.filter(i => (i.title + (i.desc||'') + (i.html||'') + (i.steps||[]).join('')).toLowerCase().includes(q))
      : section.items;
    if (!items.length) return;

    const catTitle = document.createElement('div');
    catTitle.className = 'docs-cat-title';
    catTitle.textContent = section.cat;
    out.appendChild(catTitle);

    const allWide = items.every(i => i.wide);
    const grid = document.createElement('div');
    grid.className = allWide ? 'docs-grid-wide' : 'docs-grid';
    out.appendChild(grid);

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'doc-card' + (item.wide ? ' wide' : '');

      // Build card inner HTML
      let inner = `<div class="doc-card-icon">${item.icon}</div><h3>${item.title}</h3>`;
      if (item.desc) inner += `<p>${item.desc}</p>`;

      // Rich HTML content
      if (item.html) {
        inner += `<div class="doc-html">${item.html}</div>`;
      }

      // Steps list (roadmap)
      if (item.steps) {
        inner += '<ul style="margin-top:10px;padding-left:0;list-style:none">' +
          item.steps.map(s => `<li style="padding:5px 0;border-bottom:1px solid var(--border2);color:var(--text-dim);font-size:13px">${s}</li>`).join('') +
          '</ul>';
      }

      // "Try in Tester" buttons
      if (item.tries && item.tries.length) {
        inner += '<div class="try-row"><span class="try-lbl">▶ Try:</span>' +
          item.tries.map(t => `<button class="try-btn" onclick="loadExByName('${t.replace(/'/g,"\\'")}')">
            ${t}</button>`).join('') +
          '</div>';
      }

      card.innerHTML = inner;
      grid.appendChild(card);
    });
  });

  if (!out.children.length) {
    out.innerHTML = `<div style="padding:40px;text-align:center;color:var(--text-muted)">No results for "${esc(filter)}"</div>`;
  }
}

init();
