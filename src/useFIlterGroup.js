import { useState, useMemo } from "react";
import relationData from "./data.json";

function calcUniqueGroups() {
  return [...new Set(relationData.relations.map((rel) => rel.group))];
}

function calcFiltered(group) {
  return relationData.relations.filter((rel) => rel.group === group);
}

export default function useFilterGroup(initialGroup) {
  const [group, setGroup] = useState(initialGroup);
  const filtered = useMemo(() => calcFiltered(group), [group]);
  const uniqueGroups = useMemo(() => calcUniqueGroups(), []);

  return { group, setGroup, filtered, uniqueGroups };
}
