import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const playersInitial = [
  { name: "Novak", attendance: [false, false, false] },
  { name: "Svoboda", attendance: [false, false, false] },
];

export default function DochazkaApp() {
  const [players, setPlayers] = useState(() => {
    const stored = localStorage.getItem("players");
    return stored ? JSON.parse(stored) : playersInitial;
  });

  const [selectedWeek, setSelectedWeek] = useState("2025-W28");
  const [currentWeek, setCurrentWeek] = useState("");

  useEffect(() => {
    const today = new Date();
    const onejan = new Date(today.getFullYear(), 0, 1);
    const week = Math.ceil((((today.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    setCurrentWeek(`Aktuální týden: ${week}`);
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const toggleAttendance = (playerIndex, trainingIndex) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].attendance[trainingIndex] = !updatedPlayers[playerIndex].attendance[trainingIndex];
    setPlayers(updatedPlayers);
  };

  const addPlayer = () => {
    const name = prompt("Jméno hráče:");
    if (name) {
      setPlayers([...players, { name, attendance: [false, false, false] }]);
    }
  };

  const removePlayer = (index) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const cancelTraining = (trainingIndex) => {
    const updatedPlayers = players.map((player) => {
      const newAttendance = [...player.attendance];
      newAttendance[trainingIndex] = false;
      return { ...player, attendance: newAttendance };
    });
    setPlayers(updatedPlayers);
  };

  const totalStats = players.map((p) => p.attendance.filter(Boolean).length);

  return (
    <div className="p-4 space-y-4 min-h-screen bg-gray-50">
      {/* Záhlaví */}
      <header className="flex justify-between items-center text-center">
        <h1 className="text-2xl font-bold">Docházka hráčů</h1>
        <div className="text-muted-foreground text-sm">{currentWeek}</div>
      </header>

      {/* Výběr týdne */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <label className="font-medium">Týden:</label>
        <Select value={selectedWeek} onValueChange={setSelectedWeek}>
          <SelectTrigger className="w-full sm:w-48">{selectedWeek}</SelectTrigger>
          <SelectContent>
            {Array.from({ length: 52 }, (_, i) => (
              <SelectItem key={i} value={`2025-W${i + 1}`}>{`2025 - týden ${i + 1}`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabulka hráčů */}
      <Card>
        <CardContent className="p-2 overflow-x-auto">
          <table className="w-full text-left border text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Hráč</th>
                <th className="p-2">Trénink 1</th>
                <th className="p-2">Trénink 2</th>
                <th className="p-2">Trénink 3</th>
                <th className="p-2">Akce</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, pi) => (
                <tr key={pi} className="border-b">
                  <td className="p-2 font-medium">{player.name}</td>
                  {player.attendance.map((attended, ti) => (
                    <td key={ti} className="p-2 text-center">
                      <Switch
                        checked={attended}
                        onCheckedChange={() => toggleAttendance(pi, ti)}
                      />
                    </td>
                  ))}
                  <td className="p-2 text-center">
                    <Button variant="destructive" size="sm" onClick={() => removePlayer(pi)}>
                      Odebrat
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Konfigurace */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="font-semibold text-lg">Konfigurace</h2>
          <Button className="w-full" onClick={addPlayer}>Přidat hráče</Button>
          <div className="flex flex-col sm:flex-row gap-2">
            {[0, 1, 2].map((i) => (
              <Button key={i} variant="outline" className="flex-1" onClick={() => cancelTraining(i)}>
                Zrušit trénink {i + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistiky */}
      <Card>
        <CardContent className="p-4 space-y-2">
          <h2 className="font-semibold text-lg">Statistiky</h2>
          <ul className="list-disc pl-5 text-sm">
            {players.map((p, i) => (
              <li key={i}>
                {p.name}: {totalStats[i]} / 3 účastí
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
