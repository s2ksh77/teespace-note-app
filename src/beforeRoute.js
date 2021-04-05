const beforeRoute = (location) => {
    const { search: targetApp, pathname } = location;
    console.log(targetApp, pathname)
}

export default beforeRoute;
