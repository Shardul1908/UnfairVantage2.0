import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import CreateSegmentsNavbar from "../../../Components/CreateSegmentsNavbar";

function CreateSegments() {
    const router = useRouter();
    const { shop, segment } = router.query;
    
    useEffect(() => {
        let seg = parseInt(segment);
        if(!isNaN(seg)) {
            console.log("is a number");    
        }else {
            console.log("not a number");
        }
    },[]);

    return (    
        <CreateSegmentsNavbar shop={shop} segment={segment}></CreateSegmentsNavbar>
    )
}

export default CreateSegments