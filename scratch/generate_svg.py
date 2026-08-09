import json

def mirror_pt(pt):
    return (400 - pt[0], pt[1])

def mirror_pts(pts):
    return [mirror_pt(p) for p in pts]

def pt_to_str(p):
    return f"{p[0]},{p[1]}"

def make_path(pts, close=True):
    res = f"M {pt_to_str(pts[0])} "
    for p in pts[1:]:
        res += f"L {pt_to_str(p)} "
    if close:
        res += "Z"
    return res

# To make it look organic without manual cubic beziers, we can use a smoothing algorithm (Catmull-Rom to Bezier)
# But for simplicity and to ensure perfect airtight boundaries between zones, 
# a high-resolution polygon (many points) is best, or explicit bezier points that are shared.

# Let's define a dense set of points for the right half silhouette
nodes = {}

# Head & Neck
nodes['top_head'] = (200, 50)
nodes['head_r1'] = (220, 55)
nodes['head_r2'] = (235, 75)
nodes['head_r3'] = (235, 100)
nodes['jaw_r'] = (220, 130)
nodes['chin'] = (200, 140)

nodes['neck_r_top'] = (215, 125)
nodes['neck_r_bot'] = (220, 160)
nodes['neck_center_bot'] = (200, 165)

# Chest
nodes['shoulder_r_top'] = (260, 165)
nodes['shoulder_r_out'] = (285, 190)
nodes['shoulder_r_bot'] = (280, 220)
nodes['armpit_r'] = (245, 230)
nodes['chest_r_bot'] = (240, 270)
nodes['chest_center_bot'] = (200, 275)

# Abdomen
nodes['waist_r'] = (235, 340)
nodes['abs_center_bot'] = (200, 360)

# Pelvis
nodes['hip_r_top'] = (255, 390)
nodes['hip_r_out'] = (265, 430)
nodes['groin_r'] = (215, 460)
nodes['pelvis_center_bot'] = (200, 470)

# Right Arm
nodes['upper_arm_r_out1'] = (285, 260)
nodes['upper_arm_r_out2'] = (290, 310)
nodes['upper_arm_r_in1'] = (245, 270)
nodes['upper_arm_r_in2'] = (255, 310)

nodes['elbow_r_out1'] = (290, 310)
nodes['elbow_r_out2'] = (292, 340)
nodes['elbow_r_in1'] = (255, 310)
nodes['elbow_r_in2'] = (260, 340)

nodes['forearm_r_out1'] = (292, 340)
nodes['forearm_r_out2'] = (295, 390)
nodes['forearm_r_out3'] = (285, 440)
nodes['forearm_r_in1'] = (260, 340)
nodes['forearm_r_in2'] = (270, 390)
nodes['forearm_r_in3'] = (265, 440)

nodes['wrist_r_out1'] = (285, 440)
nodes['wrist_r_out2'] = (282, 460)
nodes['wrist_r_in1'] = (265, 440)
nodes['wrist_r_in2'] = (262, 460)

nodes['hand_r_out'] = (285, 510)
nodes['hand_r_tip'] = (275, 550)
nodes['hand_r_in'] = (255, 500)

# Right Leg
nodes['thigh_r_out1'] = (265, 430)
nodes['thigh_r_out2'] = (270, 510)
nodes['thigh_r_out3'] = (260, 590)
nodes['thigh_r_in1'] = (215, 460)
nodes['thigh_r_in2'] = (225, 520)
nodes['thigh_r_in3'] = (230, 590)

nodes['knee_r_out1'] = (260, 590)
nodes['knee_r_out2'] = (258, 640)
nodes['knee_r_in1'] = (230, 590)
nodes['knee_r_in2'] = (232, 640)

nodes['calf_r_out1'] = (258, 640)
nodes['calf_r_out2'] = (265, 700)
nodes['calf_r_out3'] = (250, 770)
nodes['calf_r_in1'] = (232, 640)
nodes['calf_r_in2'] = (235, 710)
nodes['calf_r_in3'] = (235, 770)

nodes['ankle_r_out1'] = (250, 770)
nodes['ankle_r_out2'] = (248, 790)
nodes['ankle_r_in1'] = (235, 770)
nodes['ankle_r_in2'] = (238, 790)

nodes['foot_r_out'] = (255, 830)
nodes['foot_r_tip'] = (245, 860)
nodes['foot_r_in'] = (230, 830)

def spline(pts):
    # simple polyline for now, but formatted so we can easily smooth it if needed.
    return pts

def create_region(right_pts, mirror=False):
    if mirror:
        right_pts = mirror_pts(right_pts)
    return make_path(right_pts)

# Regions
regions = {}

# HEAD (Center)
head_pts = [nodes['chin'], nodes['jaw_r'], nodes['head_r3'], nodes['head_r2'], nodes['head_r1'], nodes['top_head']]
head_pts += mirror_pts(head_pts)[::-1][1:-1] # add left side reversed
regions['head'] = make_path(head_pts)

# NECK (Center)
neck_pts = [nodes['neck_center_bot'], nodes['neck_r_bot'], nodes['neck_r_top']]
neck_pts += mirror_pts(neck_pts)[::-1][1:-1]
regions['neck'] = make_path(neck_pts)

# CHEST (Center)
chest_pts = [nodes['chest_center_bot'], nodes['chest_r_bot'], nodes['armpit_r'], nodes['shoulder_r_bot'], nodes['shoulder_r_out'], nodes['shoulder_r_top'], nodes['neck_r_bot'], nodes['neck_center_bot']]
chest_pts += mirror_pts(chest_pts)[::-1][1:-1]
regions['chest'] = make_path(chest_pts)

# ABDOMEN (Center)
abs_pts = [nodes['abs_center_bot'], nodes['waist_r'], nodes['chest_r_bot'], nodes['chest_center_bot']]
abs_pts += mirror_pts(abs_pts)[::-1][1:-1]
regions['abdomen'] = make_path(abs_pts)

# PELVIS (Center)
pelvis_pts = [nodes['pelvis_center_bot'], nodes['groin_r'], nodes['hip_r_out'], nodes['hip_r_top'], nodes['waist_r'], nodes['abs_center_bot']]
pelvis_pts += mirror_pts(pelvis_pts)[::-1][1:-1]
regions['pelvis'] = make_path(pelvis_pts)

def define_limb(prefix):
    r_pts = []
    return r_pts

# ARMS
for side, is_mirror in [('right', False), ('left', True)]:
    # SHOULDER
    sh_pts = [nodes['armpit_r'], nodes['shoulder_r_bot'], nodes['shoulder_r_out'], nodes['upper_arm_r_out1'], nodes['upper_arm_r_in1']]
    regions[f'{side}_shoulder'] = create_region(sh_pts, is_mirror)
    
    # UPPER ARM
    ua_pts = [nodes['upper_arm_r_in1'], nodes['upper_arm_r_out1'], nodes['upper_arm_r_out2'], nodes['upper_arm_r_in2']]
    regions[f'{side}_upper_arm'] = create_region(ua_pts, is_mirror)
    
    # ELBOW
    el_pts = [nodes['elbow_r_in1'], nodes['elbow_r_out1'], nodes['elbow_r_out2'], nodes['elbow_r_in2']]
    regions[f'{side}_elbow'] = create_region(el_pts, is_mirror)
    
    # FOREARM
    fa_pts = [nodes['forearm_r_in1'], nodes['forearm_r_out1'], nodes['forearm_r_out2'], nodes['forearm_r_out3'], nodes['forearm_r_in3'], nodes['forearm_r_in2']]
    regions[f'{side}_forearm'] = create_region(fa_pts, is_mirror)
    
    # WRIST
    wr_pts = [nodes['wrist_r_in1'], nodes['wrist_r_out1'], nodes['wrist_r_out2'], nodes['wrist_r_in2']]
    regions[f'{side}_wrist'] = create_region(wr_pts, is_mirror)
    
    # HAND
    ha_pts = [nodes['wrist_r_in2'], nodes['wrist_r_out2'], nodes['hand_r_out'], nodes['hand_r_tip'], nodes['hand_r_in']]
    regions[f'{side}_hand'] = create_region(ha_pts, is_mirror)
    
    # HIP
    hip_pts = [nodes['groin_r'], nodes['hip_r_out'], nodes['thigh_r_out1'], nodes['thigh_r_in1']]
    regions[f'{side}_hip'] = create_region(hip_pts, is_mirror)

    # THIGH
    th_pts = [nodes['thigh_r_in1'], nodes['thigh_r_out1'], nodes['thigh_r_out2'], nodes['thigh_r_out3'], nodes['thigh_r_in3'], nodes['thigh_r_in2']]
    regions[f'{side}_thigh'] = create_region(th_pts, is_mirror)
    
    # KNEE
    kn_pts = [nodes['knee_r_in1'], nodes['knee_r_out1'], nodes['knee_r_out2'], nodes['knee_r_in2']]
    regions[f'{side}_knee'] = create_region(kn_pts, is_mirror)
    
    # CALF
    ca_pts = [nodes['calf_r_in1'], nodes['calf_r_out1'], nodes['calf_r_out2'], nodes['calf_r_out3'], nodes['calf_r_in3'], nodes['calf_r_in2']]
    regions[f'{side}_calf'] = create_region(ca_pts, is_mirror)
    
    # ANKLE
    an_pts = [nodes['ankle_r_in1'], nodes['ankle_r_out1'], nodes['ankle_r_out2'], nodes['ankle_r_in2']]
    regions[f'{side}_ankle'] = create_region(an_pts, is_mirror)
    
    # FOOT
    fo_pts = [nodes['ankle_r_in2'], nodes['ankle_r_out2'], nodes['foot_r_out'], nodes['foot_r_tip'], nodes['foot_r_in']]
    regions[f'{side}_foot'] = create_region(fo_pts, is_mirror)

print(json.dumps(regions, indent=2))
