const formatAddress = (land) => {
    return `${land.address}, ${land.village}, ${land.district}, ${land.postalCode}`
}

export default formatAddress;