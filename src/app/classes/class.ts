export class UserSignInClass {
  constructor(
    public email: string = '',
    public password: string = ''
  ) {
  }
}

export class PhoneSignInClass {
  constructor(
    public number: string = '+91'
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

export class UserRegisterClass {
  constructor(
    public teacherName: string = '',
    public schoolName: string = '',
    public schoolType: string = '',
    public userId: string = '',
    public password: string = '',
    public email: string = '',
    public phone: number = null,
    public address: string = '',
    public city: string = '',
    public pinCode: number = null,
    public state: string = ''
  ) {
  }
}

export class VerificationTypeClass {
  constructor(
    public email: string = 'Email',
    public phone: string = 'Mobile',
  ) {
  }

  get types() {
    return [this.email, this.phone];
  }
}

export class IdeaClass {
  constructor(
    public studentName: string = '',
    public studentClass: number = null,
    public studentSection: string = '',
    public studentRollNumber: string = '',
    public idea: string = '',
    public photos: any[],
    public videoLinks: any[]
  ) {

  }
}



