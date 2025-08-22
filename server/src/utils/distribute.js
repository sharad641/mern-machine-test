export const distributeRoundRobin = (items, agents) => {
  const assigned = [];
  const n = 5; // exactly 5 agents required by spec
  for (let i = 0; i < items.length; i++) {
    const agent = agents[i % n];
    assigned.push({ ...items[i], assignedTo: agent._id });
  }
  return assigned;
};
