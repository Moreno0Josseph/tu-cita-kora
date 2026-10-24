export function calcularIMC(peso, tallaCm) {
  const pesoNum = Number(peso);
  const tallaMetros = Number(tallaCm) / 100;

  if (
    !Number.isFinite(pesoNum) ||
    !Number.isFinite(tallaMetros) ||
    pesoNum <= 0 ||
    tallaMetros <= 0
  ) {
    return null;
  }

  return Number(
    (pesoNum / (tallaMetros ** 2)).toFixed(2)
  );
}
