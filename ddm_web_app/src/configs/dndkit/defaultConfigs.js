export function findContainer(id, items) {
    if (id in items) {
        return id;
    }

    const a = Object.keys(items).find((key) => {
        for (let item of items[key]) {
            if (item.id === id) {
                return true;
            }
        }
    });
    return a;
}

export default {findContainer}