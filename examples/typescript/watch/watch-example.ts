// in a real program use require('@kubernetes/client-node')
import * as k8s from '../../../dist/index';

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const watch = new k8s.Watch(kc);
watch
    .watch(
        '/api/v1/namespaces',
        // optional query parameters can go here.
        {
            allowWatchBookmarks: true,
        },
        // callback is called for each received object.
        (type, apiObj, watchObj: k8s.KubernetesObject): void => {
            if (watchObj === undefined) {
                console.log('watchObj is undefined'); // eslint-disable-line no-console
                return;
            }
            if (type === 'ADDED') {
                console.log('new object:'); // eslint-disable-line no-console
            } else if (type === 'MODIFIED') {
                console.log('changed object:'); // eslint-disable-line no-console
            } else if (type === 'DELETED') {
                console.log('deleted object:'); // eslint-disable-line no-console
            } else if (type === 'BOOKMARK') {
                if (watchObj.metadata === undefined) {
                    console.log('bookmark: metadata is undefined'); // eslint-disable-line no-console
                    return;
                }
                console.log(`bookmark: ${watchObj.metadata.resourceVersion}`); // eslint-disable-line no-console
            } else {
                console.log('unknown type: ' + type); // eslint-disable-line no-console
            }
            console.log(apiObj); // eslint-disable-line no-console
        },
        // done callback is called if the watch terminates normally
        (err): void => {
            console.log(err); // eslint-disable-line no-console
        },
    )
    .then((req): void => {
        // watch returns a request object which you can use to abort the watch.
        setTimeout((): void => {
            req.abort();
        }, 10 * 1000);
    })
    .catch((err): void => {
        console.log(err); // eslint-disable-line no-console
    });
