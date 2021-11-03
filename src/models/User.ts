interface Address {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
}

interface Company {
    name: string,
    catchphrase: string,
    bs: string
}

export interface User {
    id: number,
    name: string,
    username: string,
    email: string,
}

export interface UserProfile extends User {
    address: Address,
    phone: string,
    website: string,
    company: Company
}