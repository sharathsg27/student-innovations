export class NewUserSignIn {
  constructor(
    public email: string = '',
    public password: string = ''
  ) {
  }
}

export class PhoneSignIn {
  constructor(
    public country: string = '',
    public number: string = ''
  ) {
  }
}

export class SchoolTypeClass {
  constructor(
    public government: string = 'Government',
    public residential: string = 'Residential',
  ) {
  }
}



