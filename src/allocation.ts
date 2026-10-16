export {};

const canvas = document.querySelector<HTMLCanvasElement>("#allocation-canvas")!;
const ctx = canvas.getContext("2d")!;
const readout = document.querySelector<HTMLParagraphElement>(
  "#allocation-readout",
)!;
let assignedSupplyCrew = 2;

function calculateProduction(assignedCrew: number): number {
  return assignedCrew * 3;
}

function updateAllocation() {
  const production = calculateProduction(assignedSupplyCrew);
  const consumption = 6;
  const balance = production - consumption;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCrewAssignments(assignedSupplyCrew);

  ctx.fillStyle = "#233e43";
  ctx.font = "14px system-ui";
  ctx.fillText(`Producers: ${assignedSupplyCrew} / 6`, 18, 76);
  ctx.fillText(`Production: ${production}`, 18, 102);
  ctx.fillStyle = "#27766b";
  ctx.fillRect(18, 110, production * 14, 20);
  ctx.fillStyle = "#233e43";
  ctx.fillText(`Consumption: ${consumption}`, 18, 154);
  ctx.fillStyle = "#a44d23";
  ctx.fillRect(18, 162, consumption * 14, 20);
  readout.textContent =
    `Assigned: ${assignedSupplyCrew}/6 · Production: ${production} · Consumption: ${consumption} · Balance: ${
      balance > 0 ? "+" : ""
    }${balance}`;
}

function drawCrewAssignments(assignedCrew: number): void {
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = i < assignedCrew ? "#27766b" : "#c9d2c9";
    ctx.fillRect(18 + i * 45, 16, 36, 36);
    ctx.fillStyle = i < assignedCrew ? "#ffffff" : "#233e43";
    ctx.font = "16px system-ui";
    ctx.fillText(String(i + 1), 31 + i * 45, 40);
  }
}

document.querySelector<HTMLButtonElement>("#allocation-less")!.onclick = () => {
  assignedSupplyCrew = Math.max(0, assignedSupplyCrew - 1);
  updateAllocation();
};
document.querySelector<HTMLButtonElement>("#allocation-more")!.onclick = () => {
  assignedSupplyCrew = Math.min(6, assignedSupplyCrew + 1);
  updateAllocation();
};
document.querySelector<HTMLButtonElement>("#allocation-reset")!.onclick =
  () => {
    assignedSupplyCrew = 2;
    updateAllocation();
  };
updateAllocation();
