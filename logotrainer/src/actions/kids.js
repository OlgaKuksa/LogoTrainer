export const GET_KIDS='GET_KIDS';
export const ADD_KID='ADD_KID';
export const UPDATE_KID='UPDATE_KID';


export const getKids=payload=>(
    {
        type:GET_KIDS,
        payload
    }
);

export const addKid=kid=>(
        {
            type:ADD_KID,
            payload:{
                ...kid,
                id:Date.now(),
                isArchived:false
            }
        }
);

export const updateKid=payload=>(
    {
        type:UPDATE_KID,
        payload
    }
)