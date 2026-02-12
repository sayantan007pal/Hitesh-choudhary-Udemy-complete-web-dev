export default function UserProfile({ params }: any) {
    return (
        <div>
            <h1>User Profile: 
                <span>{params.id}</span>
                
                </h1>
            <hr />
        </div>
    )
}