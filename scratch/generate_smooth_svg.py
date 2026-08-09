import json

def mirror_pt(pt):
    return (400 - pt[0], pt[1])

def mirror_pts(pts):
    return [mirror_pt(p) for p in pts]

def pt_to_str(p):
    return f"{p[0]:.1f},{p[1]:.1f}"

# Catmull-Rom to Cubic Bezier conversion for smooth organic paths
def catmull_rom_to_bezier(pts):
    if len(pts) < 3:
        return ""
    
    # Pad points for Catmull-Rom
    p0 = (pts[0][0] * 2 - pts[1][0], pts[0][1] * 2 - pts[1][1])
    pn = (pts[-1][0] * 2 - pts[-2][0], pts[-1][1] * 2 - pts[-2][1])
    ext_pts = [p0] + pts + [pn]
    
    res = f"M {pt_to_str(pts[0])} "
    for i in range(1, len(ext_pts) - 2):
        p0 = ext_pts[i-1]
        p1 = ext_pts[i]
        p2 = ext_pts[i+1]
        p3 = ext_pts[i+2]
        
        # Tension parameter
        alpha = 0.5
        
        # Calculate control points
        cp1x = p1[0] + (p2[0] - p0[0]) / 6.0
        cp1y = p1[1] + (p2[1] - p0[1]) / 6.0
        
        cp2x = p2[0] - (p3[0] - p1[0]) / 6.0
        cp2y = p2[1] - (p3[1] - p1[1]) / 6.0
        
        res += f"C {pt_to_str((cp1x, cp1y))} {pt_to_str((cp2x, cp2y))} {pt_to_str(p2)} "
        
    res += "Z"
    return res

# Define high-res anatomical nodes for the right half
nodes = {}

# Head
nodes['top_head'] = (200, 40)
nodes['head_r1'] = (218, 45)
nodes['head_r2'] = (225, 60)
nodes['head_r3'] = (225, 80)
nodes['jaw_r'] = (215, 110)
nodes['chin'] = (200, 120)

nodes['neck_r_top'] = (210, 110)
nodes['neck_r_bot'] = (215, 135)
nodes['neck_c_bot'] = (200, 140)

# Torso
nodes['sh_r_top'] = (250, 140)
nodes['sh_r_out'] = (275, 160)
nodes['armpit_r'] = (245, 195)
nodes['chest_r_bot'] = (240, 240)
nodes['chest_c_bot'] = (200, 245)

nodes['waist_r'] = (235, 300)
nodes['abs_c_bot'] = (200, 310)

nodes['hip_r_out'] = (260, 370)
nodes['groin_r'] = (210, 390)
nodes['pelvis_c_bot'] = (200, 400)

# Arm
nodes['sh_bot'] = (270, 210)

nodes['ua_r_out_mid'] = (280, 260)
nodes['ua_r_out_bot'] = (282, 310)
nodes['ua_r_in_mid'] = (250, 260)
nodes['ua_r_in_bot'] = (255, 310)

nodes['elbow_r_out'] = (283, 340)
nodes['elbow_r_in'] = (258, 340)

nodes['fa_r_out_mid'] = (288, 390)
nodes['fa_r_out_bot'] = (280, 440)
nodes['fa_r_in_mid'] = (265, 390)
nodes['fa_r_in_bot'] = (260, 440)

nodes['wrist_r_out'] = (278, 460)
nodes['wrist_r_in'] = (258, 460)

nodes['hand_r_out'] = (282, 510)
nodes['hand_r_tip'] = (272, 540)
nodes['hand_r_in'] = (255, 490)

# Leg
nodes['th_r_out_mid'] = (268, 470)
nodes['th_r_out_bot'] = (260, 540)
nodes['th_r_in_mid'] = (225, 470)
nodes['th_r_in_bot'] = (230, 540)

nodes['knee_r_out'] = (258, 590)
nodes['knee_r_in'] = (232, 590)

nodes['calf_r_out_mid'] = (265, 660)
nodes['calf_r_out_bot'] = (250, 740)
nodes['calf_r_in_mid'] = (235, 660)
nodes['calf_r_in_bot'] = (235, 740)

nodes['ankle_r_out'] = (248, 765)
nodes['ankle_r_in'] = (236, 765)

nodes['foot_r_out'] = (255, 810)
nodes['foot_r_tip'] = (245, 840)
nodes['foot_r_in'] = (230, 810)

def poly(pts):
    return catmull_rom_to_bezier(pts)

def create_region(r_pts, mirror=False):
    if mirror:
        r_pts = mirror_pts(r_pts)
    return poly(r_pts)

regions = {}

# HEAD
head_pts = [nodes['chin'], nodes['jaw_r'], nodes['head_r3'], nodes['head_r2'], nodes['head_r1'], nodes['top_head']]
head_pts += mirror_pts(head_pts)[::-1][1:-1]
regions['head'] = poly(head_pts)

# NECK
neck_pts = [nodes['neck_c_bot'], nodes['neck_r_bot'], nodes['neck_r_top']]
neck_pts += mirror_pts(neck_pts)[::-1][1:-1]
regions['neck'] = poly(neck_pts)

# CHEST
chest_pts = [nodes['chest_c_bot'], nodes['chest_r_bot'], nodes['armpit_r'], nodes['sh_bot'], nodes['sh_r_out'], nodes['sh_r_top'], nodes['neck_r_bot'], nodes['neck_c_bot']]
chest_pts += mirror_pts(chest_pts)[::-1][1:-1]
regions['chest'] = poly(chest_pts)

# ABDOMEN
abs_pts = [nodes['abs_c_bot'], nodes['waist_r'], nodes['chest_r_bot'], nodes['chest_c_bot']]
abs_pts += mirror_pts(abs_pts)[::-1][1:-1]
regions['abdomen'] = poly(abs_pts)

# PELVIS
pelv_pts = [nodes['pelvis_c_bot'], nodes['groin_r'], nodes['hip_r_out'], nodes['waist_r'], nodes['abs_c_bot']]
pelv_pts += mirror_pts(pelv_pts)[::-1][1:-1]
regions['pelvis'] = poly(pelv_pts)

for side, is_mirror in [('right', False), ('left', True)]:
    regions[f'{side}_shoulder'] = create_region([nodes['armpit_r'], nodes['sh_bot'], nodes['sh_r_out'], nodes['ua_r_out_mid'], nodes['ua_r_in_mid']], is_mirror)
    regions[f'{side}_upper_arm'] = create_region([nodes['ua_r_in_mid'], nodes['ua_r_out_mid'], nodes['ua_r_out_bot'], nodes['ua_r_in_bot']], is_mirror)
    regions[f'{side}_elbow'] = create_region([nodes['ua_r_in_bot'], nodes['ua_r_out_bot'], nodes['elbow_r_out'], nodes['elbow_r_in']], is_mirror)
    regions[f'{side}_forearm'] = create_region([nodes['elbow_r_in'], nodes['elbow_r_out'], nodes['fa_r_out_mid'], nodes['fa_r_out_bot'], nodes['fa_r_in_bot'], nodes['fa_r_in_mid']], is_mirror)
    regions[f'{side}_wrist'] = create_region([nodes['fa_r_in_bot'], nodes['fa_r_out_bot'], nodes['wrist_r_out'], nodes['wrist_r_in']], is_mirror)
    regions[f'{side}_hand'] = create_region([nodes['wrist_r_in'], nodes['wrist_r_out'], nodes['hand_r_out'], nodes['hand_r_tip'], nodes['hand_r_in']], is_mirror)
    
    regions[f'{side}_hip'] = create_region([nodes['groin_r'], nodes['hip_r_out'], nodes['th_r_out_mid'], nodes['th_r_in_mid']], is_mirror)
    regions[f'{side}_thigh'] = create_region([nodes['th_r_in_mid'], nodes['th_r_out_mid'], nodes['th_r_out_bot'], nodes['th_r_in_bot']], is_mirror)
    regions[f'{side}_knee'] = create_region([nodes['th_r_in_bot'], nodes['th_r_out_bot'], nodes['knee_r_out'], nodes['knee_r_in']], is_mirror)
    regions[f'{side}_calf'] = create_region([nodes['knee_r_in'], nodes['knee_r_out'], nodes['calf_r_out_mid'], nodes['calf_r_out_bot'], nodes['calf_r_in_bot'], nodes['calf_r_in_mid']], is_mirror)
    regions[f'{side}_ankle'] = create_region([nodes['calf_r_in_bot'], nodes['calf_r_out_bot'], nodes['ankle_r_out'], nodes['ankle_r_in']], is_mirror)
    regions[f'{side}_foot'] = create_region([nodes['ankle_r_in'], nodes['ankle_r_out'], nodes['foot_r_out'], nodes['foot_r_tip'], nodes['foot_r_in']], is_mirror)

with open('regions.json', 'w') as f:
    json.dump(regions, f, indent=2)
