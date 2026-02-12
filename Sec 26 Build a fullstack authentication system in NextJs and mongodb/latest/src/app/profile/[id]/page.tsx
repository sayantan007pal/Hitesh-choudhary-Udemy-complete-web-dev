export default function UserProfile({ params }: any) {
    return (
        <div>
            <h1>User Profile: {params.id}</h1>
            <hr />
        </div>
    )
}