export class ClientEntity {
  private id?: string;
  private name: string;
  private cpf: string;
  private phone: string;
  private birth: string;

  constructor({
    name,
    cpf,
    phone,
    birth,
  }: {
    name: string;
    cpf: string;
    phone: string;
    birth: string;
  }) {
    if (!this.validatePhone(phone)) {
      throw new Error('Invalid Phone');
    }

    if (!this.validateCpf(cpf)) {
      throw new Error('Invalid CPF');
    }

    if (!this.validBirth(birth)) {
      throw new Error('Invalid Birth');
    }

    this.name = name;
    this.phone = phone;
    this.cpf = cpf;
    this.birth = birth;
  }

  private validatePhone(phone: string): boolean {
    return phone.length === 11;
  }

  private validateCpf(cpf: string): boolean {
    return cpf.length === 11;
  }

  private validBirth(birth: string): boolean {
    return new Date(birth) < new Date();
  }
}
