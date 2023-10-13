import cluster from "cluster";
import { CoreV1Api, Middleware, RequestContext, ResponseContext,KubeConfig, PatchUtils, createConfiguration, AuthMethodsConfiguration, Configuration, ServerConfiguration } from "../dist";
import { PromiseMiddlewareWrapper } from "../dist/gen/middleware";

// const k8s = require('@kubernetes/client-node');

const kc = new KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(CoreV1Api);

k8sApi.listNamespacedPod({
    namespace: 'default'
})
.then((res) => {
    const patch = [
        {
            "op": "replace",
            "path":"/metadata/labels",
            "value": {
                "foo": "bar"
            }
        }
    ];
    const options = { "headers": { "Content-type": PatchUtils.PATCH_FORMAT_JSON_PATCH}};
    const headerPatchMiddleware = new PromiseMiddlewareWrapper({
        pre: async (requestContext: RequestContext) => {
            requestContext.setHeaderParam("Content-type", PatchUtils.PATCH_FORMAT_JSON_PATCH);
            return requestContext;
        },
        post: async (responseContext: ResponseContext) => responseContext
    })
    let currentContext = kc.getCurrentContext();
    let currentCluster = kc.getCluster(currentContext);
    if (currentCluster === undefined || currentCluster === null) {
        throw new Error("Cluster is undefined");
    }
    let server = currentCluster.server ;
    if (server === undefined) {
        throw new Error("Server is undefined");
    }

    const baseServerConfig: ServerConfiguration<{}> = new ServerConfiguration<{}>(server, {});
    const configuration: Configuration = createConfiguration({
        middleware: [headerPatchMiddleware],
        baseServer: baseServerConfig,
        authMethods: {
            default: kc,
        },
    });

    let podName = res.items[0].metadata?.name;
    if (podName === undefined) {
        throw new Error("Pod name is undefined");
    }
    k8sApi.patchNamespacedPod({
        name: podName,
        namespace: 'default',
        body: patch,
    },
    configuration
    )
    .then(() => { console.log("Patched.")})
    .catch((err) => { console.log("Error: "); console.log(err)});
});