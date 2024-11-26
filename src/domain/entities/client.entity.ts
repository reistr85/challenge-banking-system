export class ClientEntity {
  private id?: string;
  private name: string;
  private cpf: string;
  private phone: string;

  constructor({
    name,
    cpf,
    phone,
  }: {
    name: string;
    cpf: string;
    phone: string;
  }) {
    if (!this.validatePhone(phone)) {
      throw new Error('Invalid Phone');
    }

    this.name = name;
    this.phone = phone;
    this.cpf = cpf;
  }

  private validatePhone(phone: string): boolean {
    return phone.length === 11;
  }
}
