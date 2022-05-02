import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import CreateSegmentsNavbar from "../../../Components/CreateSegmentsNavbar";

//Dynamic Link to /CreateSegments/[segment]/[shop]
function CreateSegments() {
    const router = useRouter();
    const { shop, segment } = router.query;

    return (    
        <CreateSegmentsNavbar shop={shop} segment={segment}></CreateSegmentsNavbar>
    )
}

export default CreateSegments