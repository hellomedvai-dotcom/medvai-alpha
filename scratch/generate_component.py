import json

with open('regions.json', 'r') as f:
    data = json.load(f)

front_paths = data['front']
back_paths = data['back']

# We defined X>200 as 'right_*' in the python script. 
# But visually on the screen, X>200 in the FRONT view is the patient's LEFT side.
# So we map the script's 'right_*' to the actual 'left_*' ID, and vice versa.
def get_actual_id(script_id, is_front=True):
    if not (script_id.startswith('right_') or script_id.startswith('left_')):
        return script_id
        
    if is_front:
        if script_id.startswith('right_'):
            return script_id.replace('right_', 'left_')
        else:
            return script_id.replace('left_', 'right_')
    else:
        # In the BACK view, X>200 (right side of screen) is the patient's RIGHT side.
        # So 'right_*' maps to 'right_*'.
        return script_id

# The existing parent mapping
mapping = {
    'head': 'head',
    'neck': 'head',
    'chest': 'chest',
    'upper_back': 'chest',
    'abdomen': 'abdomen',
    'pelvis': 'abdomen',
    'lower_back': 'spine',
    'glutes': 'spine',
    'right_shoulder': 'arms',
    'right_upper_arm': 'arms',
    'right_elbow': 'arms',
    'right_forearm': 'arms',
    'right_wrist': 'arms',
    'right_hand': 'arms',
    'left_shoulder': 'arms',
    'left_upper_arm': 'arms',
    'left_elbow': 'arms',
    'left_forearm': 'arms',
    'left_wrist': 'arms',
    'left_hand': 'arms',
    'right_hip': 'legs',
    'right_thigh': 'legs',
    'right_knee': 'legs',
    'right_calf': 'legs',
    'right_ankle': 'legs',
    'right_foot': 'legs',
    'left_hip': 'legs',
    'left_thigh': 'legs',
    'left_knee': 'legs',
    'left_calf': 'legs',
    'left_ankle': 'legs',
    'left_foot': 'legs'
}

out = """
const AnatomicalSVGFigure = ({
  view,
  hoveredRegion,
  selectedRegion,
  onHover,
  onSelect,
  pulseActive
}: {
  view: 'front' | 'back';
  hoveredRegion: BodyRegion | null;
  selectedRegion: BodyRegion;
  onHover: (r: BodyRegion | null) => void;
  onSelect: (r: BodyRegion) => void;
  pulseActive: boolean;
}) => {
  const [activeSubPaths, setActiveSubPaths] = useState<Record<string, string>>({});
  const [hoverSubPath, setHoverSubPath] = useState<string | null>(null);

  const getPathClass = (subId: string, parentRegionId: string, isJoint: boolean = false) => {
    const isParentSelected = selectedRegion.id === parentRegionId;
    const isParentHovered = hoveredRegion?.id === parentRegionId;
    
    // If there is an active subpath for this region, only that subpath is selected.
    // If there is NO active subpath (e.g. initial load), don't select any specific subpath unless it's a fallback.
    const isActiveSelection = isParentSelected && (activeSubPaths[parentRegionId] === subId || (!activeSubPaths[parentRegionId] && subId.includes('upper_arm')));
    const isActiveHover = hoverSubPath === subId || (isParentHovered && !hoverSubPath && isActiveSelection);

    const baseZ = isJoint ? 'z-30' : 'z-20';
    
    return `transition-all duration-300 cursor-pointer ${baseZ} ${
      isActiveSelection
        ? 'fill-[#5FD7FF]/25 stroke-[#5FD7FF] stroke-[1.5px] filter drop-shadow-[0_0_12px_rgba(95,215,255,0.7)]'
        : isActiveHover
          ? 'fill-white/10 stroke-[#5FD7FF]/50 stroke-[1px] filter drop-shadow-[0_0_6px_rgba(95,215,255,0.4)]'
          : 'fill-transparent stroke-[#8A92A3]/30 stroke-[0.5px] hover:stroke-white/30'
    }`;
  };

  const handleInteract = (e: React.MouseEvent, subId: string, parentRegionId: string, isClick: boolean) => {
    e.stopPropagation(); // VERY IMPORTANT: prevents parent limb from capturing joint clicks
    const parentRegion = BODY_REGIONS.find(r => r.id === parentRegionId);
    if (!parentRegion) return;
    
    if (isClick) {
      setActiveSubPaths(prev => ({ ...prev, [parentRegionId]: subId }));
      onSelect(parentRegion);
    } else {
      setHoverSubPath(subId);
      onHover(parentRegion);
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 select-none">
      <style>
        {`
          @keyframes scanLine {
            0% { top: -20%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 120%; opacity: 0; }
          }
        `}
      </style>
      
      {/* Scan line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl z-10">
        <div className="w-full h-[150px] bg-gradient-to-b from-transparent via-[#5FD7FF]/5 to-[#5FD7FF]/15 absolute left-0" style={{ animation: 'scanLine 4s ease-in-out infinite' }} />
        <div className="w-full h-[1px] bg-[#5FD7FF]/50 absolute left-0 shadow-[0_0_8px_rgba(95,215,255,0.8)]" style={{ animation: 'scanLine 4s ease-in-out infinite', transform: 'translateY(150px)' }} />
      </div>
      
      {pulseActive && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
          <div className="w-48 h-48 sm:w-64 sm:h-64 border border-[#5FD7FF]/50 rounded-full animate-ping" />
        </div>
      )}

      {/* Grid Background for Medical Feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

      <svg viewBox="0 0 400 1000" className="w-auto h-full max-h-full drop-shadow-2xl relative" style={{ zIndex: 10 }}>
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#020617" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Base Silhouette Background */}
        <g fill="url(#bodyGrad)" stroke="#1e293b" strokeWidth="1.5">
"""

def generate_base(paths_dict, is_front):
    res = ""
    for k, v in paths_dict.items():
        res += f'          <path d="{v}" />\n'
    return res

out += """
          {view === 'front' && (
            <>
"""
out += generate_base(front_paths, True)
out += """
            </>
          )}
          {view === 'back' && (
            <>
"""
out += generate_base(back_paths, False)
out += """
            </>
          )}
        </g>
"""

# Now the interactive groups.
def generate_interactive(paths_dict, is_front):
    res = ""
    for script_id, path_data in paths_dict.items():
        actual_id = get_actual_id(script_id, is_front)
        
        if actual_id in mapping:
            parent = mapping[actual_id]
            is_joint = 'true' if 'elbow' in actual_id or 'knee' in actual_id or 'wrist' in actual_id or 'ankle' in actual_id else 'false'
            
            res += f"""
          <g 
            onClick={{(e) => handleInteract(e, '{actual_id}', '{parent}', true)}}
            onMouseEnter={{(e) => handleInteract(e, '{actual_id}', '{parent}', false)}}
            onMouseLeave={{() => setHoverSubPath(null)}}
            className={{getPathClass('{actual_id}', '{parent}', {is_joint})}}
          >
            <path d="{path_data}" />
          </g>
"""
    return res

out += """
        {/* Front Interactive Zones */}
        {view === 'front' && (
          <>
"""
out += generate_interactive(front_paths, True)
out += """
          </>
        )}

        {/* Back Interactive Zones */}
        {view === 'back' && (
          <>
"""
out += generate_interactive(back_paths, False)
out += """
          </>
        )}

      </svg>
    </div>
  );
};
"""

with open('scratch/AnatomicalSVGFigure.tsx', 'w') as f:
    f.write(out)
