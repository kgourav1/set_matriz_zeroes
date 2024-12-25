const matrixContainer = document.getElementById("matrix-container");
const generateMatrixButton = document.getElementById("generate-matrix");
const setZeroesButton = document.getElementById("set-zeroes");

let matrix = [];

function generateMatrix() {
  const rows = parseInt(document.getElementById("rows").value);
  const columns = parseInt(document.getElementById("columns").value);

  matrix = Array.from({ length: rows }, () => Array(columns).fill(0));

  matrixContainer.style.gridTemplateColumns = `repeat(${columns}, 50px)`;
  matrixContainer.innerHTML = "";

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement("div");
      cell.classList.add("matrix-cell");
      cell.contentEditable = true;
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.textContent = 0;
      cell.addEventListener("input", (e) => {
        const value = parseInt(e.target.textContent);
        matrix[i][j] = isNaN(value) ? 0 : value;
      });
      matrixContainer.appendChild(cell);
    }
  }
}

function setMatrixZeroesVisualization() {
  const rows = matrix.length;
  const columns = matrix[0].length;
  let firstRowZero = false;
  let firstColZero = false;

  // Check if the first row or first column has zero
  for (let i = 0; i < rows; i++) {
    if (matrix[i][0] === 0) firstColZero = true;
  }

  for (let j = 0; j < columns; j++) {
    if (matrix[0][j] === 0) firstRowZero = true;
  }

  // Mark zeros on the first row and column for the rest of the matrix
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < columns; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // Set cells to zero based on marks in the first row and column
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < columns; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  // Handle the first row
  if (firstRowZero) {
    for (let j = 0; j < columns; j++) {
      matrix[0][j] = 0;
    }
  }

  // Handle the first column
  if (firstColZero) {
    for (let i = 0; i < rows; i++) {
      matrix[i][0] = 0;
    }
  }

  const steps = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (matrix[i][j] === 0) {
        steps.push([i, j]);
      }
    }
  }

  visualizeSteps(steps);
}

function visualizeSteps(steps) {
  let stepIndex = 0;

  function highlightStep() {
    if (stepIndex >= steps.length) return;

    const [row, col] = steps[stepIndex];
    const cell = matrixContainer.querySelector(
      `.matrix-cell[data-row="${row}"][data-col="${col}"]`
    );
    cell.classList.add("zero");
    cell.textContent = 0;

    stepIndex++;
    setTimeout(highlightStep, 500);
  }

  highlightStep();
}

generateMatrixButton.addEventListener("click", generateMatrix);
setZeroesButton.addEventListener("click", setMatrixZeroesVisualization);

generateMatrix();
