

export interface CreateUserRequest {
    name: string;
    email: string;
    phone_number: string;
    ip: string;
    country: string;
    password: string;
    password_confirmation: string;
// referralUsername?: string ;
}

export interface BrandProps {
	id : string;
	name : string;
	image_url : string;
	industry_code : string;
	sub_industry_code : string;
	description : string;
	daily_bonus : string;
	high_score_bonus : number;
   
}
export interface loginUserRequest {
  email: string;
  password: string;

}


export interface signUpUserRequest {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password : string,
    password_confirmation : string

}

export interface AnimatedNumberProps {
  target: string | number;
  duration?: number;
}


export interface ParticipantsProps {
    name: string,
    email: string,
    phone: string,
    status: string,
    location: string,
    date_joined: string
}
