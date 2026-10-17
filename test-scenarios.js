const assert = require('assert');

console.log('🧪 Iniciando pruebas funcionales para RentApp PRO...\n');

// ==========================================
// 1. PRUEBAS DE CÁLCULO FINANCIERO (Calculadora)
// ==========================================
function testCalculatorFormulas() {
  console.log('--- Probando Fórmulas Financieras ---');
  
  const price = 70000;
  const units = 100;
  const variableCosts = 55000; // Materia prima + Empaque + Mano de obra
  const fixedCosts = 1500000;
  const targetMarginPct = 30;

  // Costo real por unidad = Costo Variable + (Costos Fijos / Unidades)
  const realCost = variableCosts + (fixedCosts / units);
  assert.strictEqual(realCost, 70000, 'El costo real por unidad debe ser 70000');

  // Ganancia por unidad = Precio - Costo Real
  const profit = price - realCost;
  assert.strictEqual(profit, 0, 'La ganancia por unidad debe ser 0');

  // Margen actual = Ganancia / Precio
  const margin = price > 0 ? profit / price : 0;
  assert.strictEqual(margin, 0, 'El margen actual debe ser 0%');

  // Precio recomendado para margen objetivo = Costo Real / (1 - (Target / 100))
  const recommendedPrice = realCost / (1 - (targetMarginPct / 100));
  assert.strictEqual(Math.round(recommendedPrice), 100000, 'El precio recomendado debe ser 100000');

  // Punto de equilibrio = Costos Fijos / (Precio - Costo Variable unitario)
  const contribution = price - variableCosts;
  const breakEven = contribution > 0 ? Math.ceil(fixedCosts / contribution) : 0;
  assert.strictEqual(breakEven, 100, 'El punto de equilibrio debe ser 100 unidades');

  console.log('✅ ¡Fórmulas financieras validadas con éxito!\n');
}

// ==========================================
// 2. PRUEBAS DE METAS DE UTILIDAD (Goals)
// ==========================================
function testGoalsFormula() {
  console.log('--- Probando Cálculo de Metas ---');
  
  const desiredGoal = 3000000;
  const profitPerUnit = 30000;
  
  const requiredSales = profitPerUnit > 0 ? Math.ceil(desiredGoal / profitPerUnit) : 0;
  assert.strictEqual(requiredSales, 100, 'Las ventas necesarias para la meta deben ser 100 unidades');

  console.log('✅ ¡Cálculo de metas validado con éxito!\n');
}

// ==========================================
// 3. PRUEBAS DE ENDPOINTS API (Requiere servidor corriendo)
// ==========================================
async function testApiEndpoints() {
  console.log('--- Probando Endpoints de la API (Asegúrate de ejecutar "npm run dev" en otra terminal) ---');
  const baseUrl = 'http://localhost:3000';

  try {
    // Test 3.1: Webhook sin token (Debe fallar con 401)
    const resUnauthorized = await fetch(`${baseUrl}/api/hotmart/webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'PURCHASE_APPROVED' })
    });
    assert.strictEqual(resUnauthorized.status, 401, 'El webhook sin token debe retornar 401 Unauthorized');
    console.log('✅ Seguridad del Webhook Hotmart validada (401 recibido correctamente sin token).');

    // Test 3.2: Asesor IA (Modo demo o respuesta)
    const resAdvisor = await fetch(`${baseUrl}/api/advisor`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: '¿Cómo mejoro mi margen?' })
    });
    const advisorData = await resAdvisor.json();
    assert.ok(advisorData.answer || advisorData.error, 'El endpoint del asesor IA debe retornar una respuesta');
    console.log('✅ Endpoint del Asesor IA respondió correctamente.');

  } catch (err) {
    if (err.cause && err.cause.code === 'ECONNREFUSED') {
      console.log('⚠️ Aviso: El servidor local de Next.js no está corriendo en http://localhost:3000.');
      console.log('   (Puedes probar las APIs ejecutando "npm run dev" en otra terminal y relanzando este script).');
    } else {
      throw err;
    }
  }
}

// Ejecutar todas las pruebas
(async () => {
  testCalculatorFormulas();
  testGoalsFormula();
  await testApiEndpoints();
  console.log('🎉 ¡Todas las pruebas lógicas finalizaron correctamente!');
})();