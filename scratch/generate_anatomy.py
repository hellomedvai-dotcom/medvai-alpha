import json
import math

# We will define points for a 400x1000 canvas. Center is X=200.
# The pose: 
# - Head centered (Y=30 to 140). 
# - Shoulders relaxed, wider than hips.
# - Arms slightly out (palms forward). Left hand ends around X=70, Right hand around X=330.
# - Legs slightly spread. Left foot X=150, Right foot X=250.

# 1 unit = 10px.

# Catmull-Rom to Cubic Bezier conversion
def pt_to_str(p):
    return f"{p[0]:.1f},{p[1]:.1f}"

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
        
        cp1x = p1[0] + (p2[0] - p0[0]) / 6.0
        cp1y = p1[1] + (p2[1] - p0[1]) / 6.0
        
        cp2x = p2[0] - (p3[0] - p1[0]) / 6.0
        cp2y = p2[1] - (p3[1] - p1[1]) / 6.0
        
        res += f"C {pt_to_str((cp1x, cp1y))} {pt_to_str((cp2x, cp2y))} {pt_to_str(p2)} "
        
    res += "Z"
    return res

def poly(pts):
    return catmull_rom_to_bezier(pts)

def mirror_pt(pt):
    return (400 - pt[0], pt[1])

def mirror_pts(pts):
    return [mirror_pt(p) for p in pts]

def create_region(r_pts, mirror=False):
    if mirror:
        r_pts = mirror_pts(r_pts)
    return poly(r_pts)


# --- Nodes for Right Half (Front) ---

nodes = {}

# HEAD (Crown to Chin)
nodes['head_top'] = (200, 30)
nodes['head_r_top'] = (218, 35)
nodes['head_r_temple'] = (226, 60)
nodes['head_r_cheek'] = (228, 85)
nodes['head_r_jaw'] = (220, 115)
nodes['chin'] = (200, 130)

# NECK
nodes['neck_r_top'] = (214, 115)
nodes['neck_r_bot'] = (218, 145)
nodes['neck_c_bot'] = (200, 150)

# SHOULDERS / TORSO
nodes['shoulder_r_top'] = (255, 150)
nodes['shoulder_r_out'] = (285, 175)
nodes['armpit_r'] = (250, 210)
nodes['chest_r_bot'] = (245, 270)
nodes['chest_c_bot'] = (200, 275)

nodes['waist_r_top'] = (235, 330)
nodes['waist_r_bot'] = (240, 390)
nodes['abs_c_bot'] = (200, 340)

nodes['hip_r_out'] = (260, 420)
nodes['groin_c'] = (200, 460)
nodes['groin_r'] = (215, 460)
nodes['pelvis_c_bot'] = (200, 430)

# RIGHT ARM (Relaxed, angled out)
nodes['sh_bot'] = (275, 225)
nodes['ua_r_out_top'] = (285, 250)
nodes['ua_r_out_mid'] = (295, 300)
nodes['ua_r_in_top'] = (255, 250)
nodes['ua_r_in_mid'] = (265, 300)

nodes['elbow_r_out'] = (300, 360)
nodes['elbow_r_in'] = (275, 360)

nodes['fa_r_out_top'] = (305, 410)
nodes['fa_r_out_bot'] = (315, 480)
nodes['fa_r_in_top'] = (280, 410)
nodes['fa_r_in_bot'] = (295, 480)

nodes['wrist_r_out'] = (320, 510)
nodes['wrist_r_in'] = (305, 510)

nodes['hand_r_out'] = (335, 560)
nodes['hand_r_fingers'] = (325, 600)
nodes['hand_r_thumb'] = (300, 560)
nodes['hand_r_in'] = (310, 580)

# RIGHT LEG (Standing naturally separated)
nodes['th_r_out_top'] = (265, 470)
nodes['th_r_out_mid'] = (275, 540)
nodes['th_r_out_bot'] = (270, 610)
nodes['th_r_in_top'] = (225, 490)
nodes['th_r_in_mid'] = (235, 540)
nodes['th_r_in_bot'] = (240, 610)

nodes['knee_r_out'] = (268, 670)
nodes['knee_r_in'] = (245, 670)

nodes['calf_r_out_top'] = (275, 740)
nodes['calf_r_out_bot'] = (265, 820)
nodes['calf_r_in_top'] = (250, 740)
nodes['calf_r_in_bot'] = (250, 820)

nodes['ankle_r_out'] = (260, 860)
nodes['ankle_r_in'] = (252, 860)

nodes['foot_r_heel'] = (265, 900)
nodes['foot_r_toe'] = (240, 920)
nodes['foot_r_in'] = (245, 880)

# Build Front Paths
front_paths = {}

head_pts = [nodes['chin'], nodes['head_r_jaw'], nodes['head_r_cheek'], nodes['head_r_temple'], nodes['head_r_top'], nodes['head_top']]
head_pts += mirror_pts(head_pts)[::-1][1:-1]
front_paths['head'] = poly(head_pts)

neck_pts = [nodes['neck_c_bot'], nodes['neck_r_bot'], nodes['neck_r_top']]
neck_pts += mirror_pts(neck_pts)[::-1][1:-1]
front_paths['neck'] = poly(neck_pts)

chest_pts = [nodes['chest_c_bot'], nodes['chest_r_bot'], nodes['armpit_r'], nodes['sh_bot'], nodes['shoulder_r_out'], nodes['shoulder_r_top'], nodes['neck_r_bot'], nodes['neck_c_bot']]
chest_pts += mirror_pts(chest_pts)[::-1][1:-1]
front_paths['chest'] = poly(chest_pts)

abs_pts = [nodes['abs_c_bot'], nodes['waist_r_top'], nodes['chest_r_bot'], nodes['chest_c_bot']]
abs_pts += mirror_pts(abs_pts)[::-1][1:-1]
front_paths['abdomen'] = poly(abs_pts)

pelvis_pts = [nodes['groin_c'], nodes['groin_r'], nodes['hip_r_out'], nodes['waist_r_bot'], nodes['waist_r_top'], nodes['abs_c_bot']]
pelvis_pts += mirror_pts(pelvis_pts)[::-1][1:-1]
front_paths['pelvis'] = poly(pelvis_pts)

for side, is_m in [('right', False), ('left', True)]:
    front_paths[f'{side}_shoulder'] = create_region([nodes['armpit_r'], nodes['sh_bot'], nodes['shoulder_r_out'], nodes['ua_r_out_top'], nodes['ua_r_in_top']], is_m)
    front_paths[f'{side}_upper_arm'] = create_region([nodes['ua_r_in_top'], nodes['ua_r_out_top'], nodes['ua_r_out_mid'], nodes['elbow_r_out'], nodes['elbow_r_in'], nodes['ua_r_in_mid']], is_m)
    front_paths[f'{side}_elbow'] = create_region([nodes['ua_r_in_mid'], nodes['elbow_r_in'], nodes['elbow_r_out'], nodes['fa_r_out_top'], nodes['fa_r_in_top']], is_m)
    front_paths[f'{side}_forearm'] = create_region([nodes['fa_r_in_top'], nodes['fa_r_out_top'], nodes['fa_r_out_bot'], nodes['wrist_r_out'], nodes['wrist_r_in'], nodes['fa_r_in_bot']], is_m)
    front_paths[f'{side}_wrist'] = create_region([nodes['fa_r_in_bot'], nodes['wrist_r_in'], nodes['wrist_r_out'], nodes['hand_r_out'], nodes['hand_r_thumb']], is_m)
    front_paths[f'{side}_hand'] = create_region([nodes['hand_r_thumb'], nodes['hand_r_out'], nodes['hand_r_fingers'], nodes['hand_r_in']], is_m)
    
    front_paths[f'{side}_hip'] = create_region([nodes['groin_r'], nodes['hip_r_out'], nodes['th_r_out_top'], nodes['th_r_in_top']], is_m)
    front_paths[f'{side}_thigh'] = create_region([nodes['th_r_in_top'], nodes['th_r_out_top'], nodes['th_r_out_mid'], nodes['th_r_out_bot'], nodes['knee_r_out'], nodes['knee_r_in'], nodes['th_r_in_bot'], nodes['th_r_in_mid']], is_m)
    front_paths[f'{side}_knee'] = create_region([nodes['th_r_in_bot'], nodes['knee_r_in'], nodes['knee_r_out'], nodes['calf_r_out_top'], nodes['calf_r_in_top']], is_m)
    front_paths[f'{side}_calf'] = create_region([nodes['calf_r_in_top'], nodes['calf_r_out_top'], nodes['calf_r_out_bot'], nodes['ankle_r_out'], nodes['ankle_r_in'], nodes['calf_r_in_bot']], is_m)
    front_paths[f'{side}_ankle'] = create_region([nodes['calf_r_in_bot'], nodes['ankle_r_in'], nodes['ankle_r_out'], nodes['foot_r_heel'], nodes['foot_r_in']], is_m)
    front_paths[f'{side}_foot'] = create_region([nodes['foot_r_in'], nodes['foot_r_heel'], nodes['foot_r_toe']], is_m)


# Build Back Paths
# The back view requires similar contours but different inner lines.
# E.g., glutes, back spine, shoulder blades.
back_paths = {}

back_paths['head'] = front_paths['head']
back_paths['neck'] = front_paths['neck']

# Upper Back (Trapezius, Shoulders)
ub_pts = [nodes['chest_c_bot'], nodes['chest_r_bot'], nodes['armpit_r'], nodes['sh_bot'], nodes['shoulder_r_out'], nodes['shoulder_r_top'], nodes['neck_r_bot'], nodes['neck_c_bot']]
ub_pts += mirror_pts(ub_pts)[::-1][1:-1]
back_paths['upper_back'] = poly(ub_pts)

# Spine / Lower Back
lb_pts = [nodes['abs_c_bot'], nodes['waist_r_top'], nodes['chest_r_bot'], nodes['chest_c_bot']]
lb_pts += mirror_pts(lb_pts)[::-1][1:-1]
back_paths['lower_back'] = poly(lb_pts)

# Glutes (Replaces pelvis)
gl_pts = [nodes['groin_c'], nodes['groin_r'], nodes['hip_r_out'], nodes['waist_r_bot'], nodes['waist_r_top'], nodes['abs_c_bot']]
gl_pts += mirror_pts(gl_pts)[::-1][1:-1]
back_paths['glutes'] = poly(gl_pts)

# The limbs for the back view are technically mirrored (left becomes right side visually) 
# BUT the IDs must remain physically consistent (the person's left arm is on the right side of the screen when facing away).
# To handle this easily, we will just map them normally but swap the SVG classes/handlers so they respond correctly.
for side, is_m in [('right', False), ('left', True)]:
    back_paths[f'{side}_shoulder'] = front_paths[f'{side}_shoulder']
    back_paths[f'{side}_upper_arm'] = front_paths[f'{side}_upper_arm']
    back_paths[f'{side}_elbow'] = front_paths[f'{side}_elbow']
    back_paths[f'{side}_forearm'] = front_paths[f'{side}_forearm']
    back_paths[f'{side}_wrist'] = front_paths[f'{side}_wrist']
    back_paths[f'{side}_hand'] = front_paths[f'{side}_hand']
    back_paths[f'{side}_hip'] = front_paths[f'{side}_hip']
    back_paths[f'{side}_thigh'] = front_paths[f'{side}_thigh']
    back_paths[f'{side}_knee'] = front_paths[f'{side}_knee']
    back_paths[f'{side}_calf'] = front_paths[f'{side}_calf']
    back_paths[f'{side}_ankle'] = front_paths[f'{side}_ankle']
    back_paths[f'{side}_foot'] = front_paths[f'{side}_foot']


out_data = {
    'front': front_paths,
    'back': back_paths
}

with open('regions.json', 'w') as f:
    json.dump(out_data, f, indent=2)

print("Generated completely new organic anatomical SVG paths with professional neutral pose.")
