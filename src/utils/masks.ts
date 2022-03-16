export function cep(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 9
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{5})(\d)/, '$1-$2')
  e.currentTarget.value = value
  return e
}
export function placaCarro(e: React.FormEvent<HTMLInputElement>) {
  /*
  Em resumo, adotaria a mesma expressão regular que a Receita Federal faz na emissão
  dos Documentos Fiscais Eletrônicos (NF-e, CT-e e MDF-e) que é esse: [A-Z]{2,3}[0-9]{4}|[A-Z]{3,4}[0-9]{3}|[A-Z0-9]{7},
  desta forma não ficaria restrito a validação das placas do Brasil.
  https://pt.stackoverflow.com/questions/363630/placa-ve%C3%ADculos-padr%C3%A3o-mercosul
  */
  /*  e.currentTarget.maxLength = 7;
  var replaced = e.currentTarget.value.replace(/[^\w]/g, '');
  var mercosul = /([A-Za-z]{3}[0-9]{1}[A-Za-z]{1})/;
  var normal = /([A-Za-z]{3}[0-9]{2})/;
  if (normal.exec(replaced)) {
    let myMask = (normal.exec(replaced);
    e.currentTarget.value = myMask;
    return e;
  } else if (mercosul.exec(replaced)) {
    myMask = 'SSS0A00';
  }
  */
}

export function placaCarro1(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 7
  let value = e.currentTarget.value
  value = value.toUpperCase()
  value = value.replace(/[^a-zA-Z 0-9]/g, '')
  value = value.replace(/[A-Z {3}]-[0-9{4}]/, '')
  // value = value.replace(/^\W/g, '');
  // value = value.replace(/({3}){3}(0-9){4}/, '$1-$2');

  e.currentTarget.value = value
}

export function currency(e: React.FormEvent<HTMLInputElement>) {
  let value = e.currentTarget.value
  value = value.replace(/\D/g, '')
  value = value.replace(/(\d)(\d{2})$/, '$1,$2')
  value = value.replace(/(?=(\d{3})+(\D))\B/g, '.')

  e.currentTarget.value = value
  return e
}

export function cpfCnpj(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 18
  let value = e.currentTarget.value
  if (value.length <= 14) {
    if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
      value = value.replace(/\D/g, '')
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')

      e.currentTarget.value = value
    }
  } else {
    if (!value.match(/^(\d{2}).(\d{3}).(\d{3}).(\d{4})-(\d{2})$/)) {
      value = value.replace(/\D/g, '')
      value = value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
        '$1.$2.$3/$4-$5'
      )

      e.currentTarget.value = value
    }
  }
  return e
}

export function telefoneMask(e: React.FormEvent<HTMLInputElement>) {
  e.currentTarget.maxLength = 15
  let value = e.currentTarget.value
  if (!value.match(/^(\d{2}).(\d{5})-(\d{4})$/)) {
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    e.currentTarget.value = value
  }
  return e
}

export function telefoneNumberMask(e: string) {
  if (!e) {
    return undefined
  }
  let value = e
  if (!value.match(/^(\d{2}).(\d{5})-(\d{4})$/)) {
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, '($1) $2')
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    e = value
  }
  return e
}

export function cpfCnpjFormat(e: string) {
  let value = e
  if (value.length <= 11) {
    if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
      value = value.replace(/\D/g, '')
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')

      e = value
      return e
    }
  }

  if (value.length <= 14) {
    if (!value.match(/^(\d{2}).(\d{3}).(\d{3}).(\d{4})-(\d{2})$/)) {
      value = value.replace(/\D/g, '')
      value = value.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
        '$1.$2.$3/$4-$5'
      )

      e = value
      return e
    }
  }
  return e
}

export function cepFormat(e: string) {
  let value = e
  value = value.replace(/\D/g, '')
  value = value.replace(/^(\d{5})(\d)/, '$1-$2')
  e = value
  return e
}
