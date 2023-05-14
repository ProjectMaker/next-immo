export const metadata = {
  title: 'Nos honoraires',
  description: 'Grille tarifaire transaction et location',
}

export default function FeesPage() {
  return (
    <div className="text-sm">
      <h1 className="font-bold mb-4 text-lime-400">Ventes</h1>
      <table className="border-collapse w-full mb-2">
        <thead>
        <tr>
          <th align="left" className="font-medium">Montant de la transaction</th>
          <th className="text-right font-medium">% de commission HT</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td align="left">De 1 à 100 000 euros</td>
          <td className="text-right">10%</td>
        </tr>
        <tr>
          <td align="left">De 100 001 à 150 000 euros</td>
          <td className="text-right">9%</td>
        </tr>
        <tr>
          <td align="left">De 150 001 à 200 000 euros</td>
          <td className="text-right">8%</td>
        </tr>
        <tr>
          <td align="left">De 200 001 à 300 000 euros</td>
          <td className="text-right">7%</td>
        </tr>
        <tr>
          <td align="left">300 001 euros et plus</td>
          <td className="text-right">6%</td>
        </tr>
        </tbody>
      </table>
      <h1 className="font-bold mb-4 text-lime-400">Locations</h1>
      <table className="border-collapse w-full mb-2">
        <tbody>
        <tr>
          <td align="left">Recherche d&apos;un locataire</td>
          <td colSpan="2" align="right">12% du loyer annuel</td>
        </tr>
        <tr>
          <td align="left">Rédaction de bail</td>
          <td colSpan="2" align="right">12% du loyer annuel</td>
        </tr>
        </tbody>
      </table>
      <h1 className="font-bold mb-4 text-lime-400">Etat des lieux</h1>
      <table className="border-collapse w-full mb-2">
        <tbody>
        <tr>
          <td align="left">F1</td>
          <td align="right">100 euros</td>
        </tr>
        <tr>
          <td align="left">F2</td>
          <td align="right">170 euros</td>
        </tr>
        <tr>
          <td align="left">F3</td>
          <td align="right">230 euros</td>
        </tr>
        <tr>
          <td align="left">F4</td>
          <td align="right">280 euros</td>
        </tr>
        <tr>
          <td align="left">F5</td>
          <td align="right">330 euros</td>
        </tr>
        <tr>
          <td align="left">Maison et +</td>
          <td align="right">380 euros</td>
        </tr>
        </tbody>
      </table>
      <h1 className="font-bold mb-4 text-lime-400">Locations professionnelles</h1>
      <p>10% HT du loyer de la période triennale hors frais de rédaction et d&apos;état des lieux</p>
    </div>
  )
}
