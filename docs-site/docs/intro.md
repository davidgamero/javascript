---
title: Introduction
slug: /
sidebar_position: 1
---

# Kubernetes JavaScript Client

Official documentation for the [Kubernetes JavaScript client](https://github.com/kubernetes-client/javascript),
the Node.js/TypeScript client library for the Kubernetes API.

## Installation

```bash
npm install @kubernetes/client-node
```

## Quick start

```typescript
import * as k8s from '@kubernetes/client-node';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const res = await k8sApi.listNamespacedPod({ namespace: 'default' });
for (const pod of res.items) {
    console.log(pod.metadata?.name);
}
```

## Documentation

- **[API Reference](/category/api-reference)** — generated reference for every
  Kubernetes API group client (Core, Apps, Batch, Networking, and more).
- Use the **search box** at the top of the page to find any API, method, or type.

For issues and contributions, visit the
[project on GitHub](https://github.com/kubernetes-client/javascript).
