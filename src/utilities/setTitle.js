export default function setTitle(routeHandle){
    document.title = routeHandle.meta.title || "Hamsuper";
}