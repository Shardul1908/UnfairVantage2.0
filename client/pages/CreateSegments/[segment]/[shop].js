import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import CreateSegmentsNavbar from "../../../Components/CreateSegmentsNavbar";

function CreateSegments() {
    const router = useRouter();
    const { shop, segment } = router.query;

    return (    
        <CreateSegmentsNavbar shop={shop} segment={segment}></CreateSegmentsNavbar>
    )
}

export default CreateSegments