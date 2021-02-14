 import { uuidv4 } from './functions.js'
 //En class (blueprint) som används för att skapa en objekt. Varje objekt som skapas utifrån denna class får en unik id från funktionen uuidv4()
 export default class User {
    constructor(email, name, lastname, phone, address, code, city) {
        this.id = uuidv4()
        this.email = email
        this.name = name
        this.lastname = lastname
        this.phone = phone
        this.address = address
        this.code = code
        this.city = city
    }
  
    
    fullName() {
        return `${this.name} ${this.lastname}`
    }
}
