# API Specification & Contracts

## Endpoints Summary

### `GET /api/health`
- **Access**: Public
- **Description**: Verifies process uptime, timestamp, and platform health.
- **Response**: `{ status: "healthy", timestamp: string, uptime: number, version: string, service: string }`

### `GET /api/zones`
- **Access**: Public / Authenticated
- **Description**: Returns monitored catchment zones with baseline topographical risk metrics.

### `GET /api/predictions`
- **Access**: Authenticated
- **Query Params**: `zoneId` (UUID optional), `minRiskLevel` (enum optional)
- **Description**: Returns latest hydrological model inference and risk drivers.

### `GET /api/alerts` & `POST /api/alerts`
- **Access**: GET (Public/Auth), POST (AUTHORITY, ADMIN)
- **Description**: Queries active alerts or transactionally authorizes an emergency civil directive.

### `GET /api/notifications`
- **Access**: Authenticated
- **Description**: Retrieves queued communication status.

### `GET /api/admin/audit`
- **Access**: ADMIN only
- **Description**: Queries immutable audit logs.
