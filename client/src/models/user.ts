interface User {
    firstName: string;
    lastName: string;
    authStrategy: string;
    email: string;
    image: string
    password: string,
    userId: string,
    credits: number;
    profileInfo?: ProfileInfo
}

interface ProfileInfo {
    PWZNumber: string;
    specializations: string;
    city: string;
    availability: string;
}

export default User;
