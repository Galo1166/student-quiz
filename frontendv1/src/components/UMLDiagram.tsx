export function UMLDiagram() {
  // Actor as stick figure
  const Actor = ({ x, y, label }: { x: number; y: number; label: string }) => (
    <g>
      {/* Head */}
      <circle cx={x} cy={y} r="12" fill="none" stroke="#1f2937" strokeWidth="2" />
      {/* Body */}
      <line x1={x} y1={y + 12} x2={x} y2={y + 40} stroke="#1f2937" strokeWidth="2" />
      {/* Arms */}
      <line x1={x - 20} y1={y + 25} x2={x + 20} y2={y + 25} stroke="#1f2937" strokeWidth="2" />
      {/* Legs */}
      <line x1={x} y1={y + 40} x2={x - 15} y2={y + 65} stroke="#1f2937" strokeWidth="2" />
      <line x1={x} y1={y + 40} x2={x + 15} y2={y + 65} stroke="#1f2937" strokeWidth="2" />
      {/* Label */}
      <text x={x} y={y + 85} textAnchor="middle" className="text-sm font-medium fill-gray-800">
        {label}
      </text>
    </g>
  );

  // Use Case (oval)
  const UseCase = ({ x, y, width, height, label }: { x: number; y: number; width: number; height: number; label: string }) => (
    <g>
      <ellipse 
        cx={x + width / 2} 
        cy={y + height / 2} 
        rx={width / 2} 
        ry={height / 2} 
        fill="white" 
        stroke="#3b82f6" 
        strokeWidth="2" 
      />
      <text 
        x={x + width / 2} 
        y={y + height / 2 + 5} 
        textAnchor="middle" 
        className="text-sm fill-gray-800"
      >
        {label}
      </text>
    </g>
  );

  // Connection line
  const Connection = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6b7280" strokeWidth="1.5" />
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Title Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-center mb-2">Student Online Quiz System – Use Case Diagram</h1>
        <div className="text-center text-gray-600">
          <p className="text-sm">Student Name: Tasiu Minkaila Musa</p>
          <p className="text-sm">UG Number: UG22ICT1065</p>
        </div>
      </div>

      {/* UML Diagram */}
      <div className="bg-white rounded-lg shadow-sm p-8 overflow-x-auto">
        <svg width="1200" height="900" className="mx-auto">
          {/* System Boundary */}
          <rect 
            x="250" 
            y="80" 
            width="700" 
            height="750" 
            fill="none" 
            stroke="#374151" 
            strokeWidth="2" 
            strokeDasharray="5,5"
            rx="8"
          />
          <text x="600" y="70" textAnchor="middle" className="font-semibold fill-gray-800">
            Student Online Quiz System (Frontend)
          </text>

          {/* Actors */}
          <Actor x={120} y={250} label="Student" />
          <Actor x={1080} y={400} label="Admin/Teacher" />

          {/* Student Use Cases */}
          <UseCase x={300} y={150} width={160} height={60} label="Register / Login" />
          <UseCase x={500} y={250} width={140} height={60} label="Take Quiz" />
          <UseCase x={500} y={350} width={160} height={60} label="View Quiz Result" />
          <UseCase x={500} y={450} width={160} height={60} label="View Quiz History" />

          {/* Admin/Teacher Use Cases */}
          <UseCase x={700} y={150} width={140} height={60} label="Login" />
          <UseCase x={700} y={250} width={140} height={60} label="Create Quiz" />
          <UseCase x={700} y={350} width={160} height={60} label="Add Questions" />
          <UseCase x={700} y={450} width={160} height={60} label="Edit Questions" />
          <UseCase x={700} y={550} width={160} height={60} label="Delete Questions" />
          <UseCase x={700} y={650} width={180} height={60} label="View Student Results" />
          <UseCase x={700} y={750} width={160} height={60} label="Manage Students" />

          {/* Student Connections */}
          <Connection x1={120} y1={265} x2={300} y2={180} />
          <Connection x1={135} y1={285} x2={500} y2={280} />
          <Connection x1={135} y1={290} x2={500} y2={380} />
          <Connection x1={135} y1={295} x2={500} y2={480} />

          {/* Admin/Teacher Connections */}
          <Connection x1={1065} y1={405} x2={840} y2={180} />
          <Connection x1={1065} y1={410} x2={840} y2={280} />
          <Connection x1={1065} y1={415} x2={860} y2={380} />
          <Connection x1={1065} y1={420} x2={860} y2={480} />
          <Connection x1={1065} y1={425} x2={860} y2={580} />
          <Connection x1={1065} y1={430} x2={860} y2={680} />
          <Connection x1={1065} y1={435} x2={860} y2={780} />

          {/* Legend */}
          <g transform="translate(280, 850)">
            <text className="text-xs font-semibold fill-gray-600">Legend:</text>
            <circle cx="50" cy="0" r="8" fill="none" stroke="#1f2937" strokeWidth="1.5" />
            <text x="65" y="5" className="text-xs fill-gray-600">Actor</text>
            <ellipse cx="130" cy="0" rx="25" ry="10" fill="white" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="165" y="5" className="text-xs fill-gray-600">Use Case</text>
            <line x1="240" y1="0" x2="270" y2="0" stroke="#6b7280" strokeWidth="1.5" />
            <text x="280" y="5" className="text-xs fill-gray-600">Association</text>
          </g>
        </svg>
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
        <h2 className="text-lg font-semibold mb-3">Diagram Overview</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="font-medium text-gray-800 mb-2">Student Functions:</p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Register and login to the system</li>
              <li>Take quizzes available in the system</li>
              <li>View results after completing quizzes</li>
              <li>Access history of all past quiz attempts</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-800 mb-2">Admin/Teacher Functions:</p>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Login to the administrative interface</li>
              <li>Create new quizzes for students</li>
              <li>Add, edit, and delete quiz questions</li>
              <li>View and analyze student results</li>
              <li>Manage student accounts and permissions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
