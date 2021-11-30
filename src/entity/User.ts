
  import * as bcrypt from "bcryptjs";
  
  export class User {

    id: number;
    username: string;
    password: string;
    email: String;
  
    hashPassword() {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
      return bcrypt.compareSync(unencryptedPassword, this.password);
    }

    init(user:User){
      this.id = user.id;
      this.username = user.username;
      this.password = user.password;
      this.email = user.email;
    }
  }