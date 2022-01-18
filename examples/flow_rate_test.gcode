G28
G1 F3000
G1 X10 Y10 Z50
G21 ; set units to millimeters
G90 ; absolute cooridinates
M83 ; relative distances for extrusion
M140 S60
M190 S60
T0
G1 F3000
G1 X278 Y305 Z0.2
G10 S215 P0
M116 P0
G1 X278 Y265 Z0.2 E20 F1020
; Testing temp=215, rate=3
M117 "Testing temp=215, rate=3"
G1 E-0.8 F2100
G1 F3000
G1 X50 Y50 Z50
G1 E0.8 F2100
G1 E50 F74.83530385382181
G1 F3000
G1 X70 Y50 Z0.2
; Testing temp=215, rate=6
M117 "Testing temp=215, rate=6"
G1 E-0.8 F2100
G1 F3000
G1 X50 Y100 Z50
G1 E0.8 F2100
G1 E50 F149.67060770764363
G1 F3000
G1 X70 Y100 Z0.2
; Testing temp=215, rate=9
M117 "Testing temp=215, rate=9"
G1 E-0.8 F2100
G1 F3000
G1 X50 Y150 Z50
G1 E0.8 F2100
G1 E50 F224.50591156146544
G1 F3000
G1 X70 Y150 Z0.2
; Testing temp=215, rate=12
M117 "Testing temp=215, rate=12"
G1 E-0.8 F2100
G1 F3000
G1 X50 Y200 Z50
G1 E0.8 F2100
G1 E50 F299.34121541528725
G1 F3000
G1 X70 Y200 Z0.2
; Testing temp=215, rate=15
M117 "Testing temp=215, rate=15"
G1 E-0.8 F2100
G1 F3000
G1 X50 Y250 Z50
G1 E0.8 F2100
G1 E50 F374.17651926910906
G1 F3000
G1 X70 Y250 Z0.2
G1 F3000
G1 X278 Y255 Z0.2
G10 S220 P0
M116 P0
G1 X278 Y215 Z0.2 E20 F1020
; Testing temp=220, rate=3
M117 "Testing temp=220, rate=3"
G1 E-0.8 F2100
G1 F3000
G1 X100 Y50 Z50
G1 E0.8 F2100
G1 E50 F74.83530385382181
G1 F3000
G1 X120 Y50 Z0.2
; Testing temp=220, rate=6
M117 "Testing temp=220, rate=6"
G1 E-0.8 F2100
G1 F3000
G1 X100 Y100 Z50
G1 E0.8 F2100
G1 E50 F149.67060770764363
G1 F3000
G1 X120 Y100 Z0.2
; Testing temp=220, rate=9
M117 "Testing temp=220, rate=9"
G1 E-0.8 F2100
G1 F3000
G1 X100 Y150 Z50
G1 E0.8 F2100
G1 E50 F224.50591156146544
G1 F3000
G1 X120 Y150 Z0.2
; Testing temp=220, rate=12
M117 "Testing temp=220, rate=12"
G1 E-0.8 F2100
G1 F3000
G1 X100 Y200 Z50
G1 E0.8 F2100
G1 E50 F299.34121541528725
G1 F3000
G1 X120 Y200 Z0.2
; Testing temp=220, rate=15
M117 "Testing temp=220, rate=15"
G1 E-0.8 F2100
G1 F3000
G1 X100 Y250 Z50
G1 E0.8 F2100
G1 E50 F374.17651926910906
G1 F3000
G1 X120 Y250 Z0.2
G1 F3000
G1 X278 Y205 Z0.2
G10 S225 P0
M116 P0
G1 X278 Y165 Z0.2 E20 F1020
; Testing temp=225, rate=3
M117 "Testing temp=225, rate=3"
G1 E-0.8 F2100
G1 F3000
G1 X150 Y50 Z50
G1 E0.8 F2100
G1 E50 F74.83530385382181
G1 F3000
G1 X170 Y50 Z0.2
; Testing temp=225, rate=6
M117 "Testing temp=225, rate=6"
G1 E-0.8 F2100
G1 F3000
G1 X150 Y100 Z50
G1 E0.8 F2100
G1 E50 F149.67060770764363
G1 F3000
G1 X170 Y100 Z0.2
; Testing temp=225, rate=9
M117 "Testing temp=225, rate=9"
G1 E-0.8 F2100
G1 F3000
G1 X150 Y150 Z50
G1 E0.8 F2100
G1 E50 F224.50591156146544
G1 F3000
G1 X170 Y150 Z0.2
; Testing temp=225, rate=12
M117 "Testing temp=225, rate=12"
G1 E-0.8 F2100
G1 F3000
G1 X150 Y200 Z50
G1 E0.8 F2100
G1 E50 F299.34121541528725
G1 F3000
G1 X170 Y200 Z0.2
; Testing temp=225, rate=15
M117 "Testing temp=225, rate=15"
G1 E-0.8 F2100
G1 F3000
G1 X150 Y250 Z50
G1 E0.8 F2100
G1 E50 F374.17651926910906
G1 F3000
G1 X170 Y250 Z0.2
G1 F3000
G1 X278 Y155 Z0.2
G10 S230 P0
M116 P0
G1 X278 Y115 Z0.2 E20 F1020
; Testing temp=230, rate=3
M117 "Testing temp=230, rate=3"
G1 E-0.8 F2100
G1 F3000
G1 X200 Y50 Z50
G1 E0.8 F2100
G1 E50 F74.83530385382181
G1 F3000
G1 X220 Y50 Z0.2
; Testing temp=230, rate=6
M117 "Testing temp=230, rate=6"
G1 E-0.8 F2100
G1 F3000
G1 X200 Y100 Z50
G1 E0.8 F2100
G1 E50 F149.67060770764363
G1 F3000
G1 X220 Y100 Z0.2
; Testing temp=230, rate=9
M117 "Testing temp=230, rate=9"
G1 E-0.8 F2100
G1 F3000
G1 X200 Y150 Z50
G1 E0.8 F2100
G1 E50 F224.50591156146544
G1 F3000
G1 X220 Y150 Z0.2
; Testing temp=230, rate=12
M117 "Testing temp=230, rate=12"
G1 E-0.8 F2100
G1 F3000
G1 X200 Y200 Z50
G1 E0.8 F2100
G1 E50 F299.34121541528725
G1 F3000
G1 X220 Y200 Z0.2
; Testing temp=230, rate=15
M117 "Testing temp=230, rate=15"
G1 E-0.8 F2100
G1 F3000
G1 X200 Y250 Z50
G1 E0.8 F2100
G1 E50 F374.17651926910906
G1 F3000
G1 X220 Y250 Z0.2
G1 F3000
G1 X278 Y105 Z0.2
G10 S235 P0
M116 P0
G1 X278 Y65 Z0.2 E20 F1020
; Testing temp=235, rate=3
M117 "Testing temp=235, rate=3"
G1 E-0.8 F2100
G1 F3000
G1 X250 Y50 Z50
G1 E0.8 F2100
G1 E50 F74.83530385382181
G1 F3000
G1 X270 Y50 Z0.2
; Testing temp=235, rate=6
M117 "Testing temp=235, rate=6"
G1 E-0.8 F2100
G1 F3000
G1 X250 Y100 Z50
G1 E0.8 F2100
G1 E50 F149.67060770764363
G1 F3000
G1 X270 Y100 Z0.2
; Testing temp=235, rate=9
M117 "Testing temp=235, rate=9"
G1 E-0.8 F2100
G1 F3000
G1 X250 Y150 Z50
G1 E0.8 F2100
G1 E50 F224.50591156146544
G1 F3000
G1 X270 Y150 Z0.2
; Testing temp=235, rate=12
M117 "Testing temp=235, rate=12"
G1 E-0.8 F2100
G1 F3000
G1 X250 Y200 Z50
G1 E0.8 F2100
G1 E50 F299.34121541528725
G1 F3000
G1 X270 Y200 Z0.2
; Testing temp=235, rate=15
M117 "Testing temp=235, rate=15"
G1 E-0.8 F2100
G1 F3000
G1 X250 Y250 Z50
G1 E0.8 F2100
G1 E50 F374.17651926910906
G1 F3000
G1 X270 Y250 Z0.2
; end gcode
M400
G10 P0 R0 S0 ; turn off extruder heater
M140 S0 ; turn off bed heater
M106 S0 ; turn off parts cooling fan
G91 ; Relative move
G1 E-1.0 Z+60.0 F1000.0 ; E : Nozzle Up/Bed Down 10mm and retract - (E to exclude from layer count)
G90 ; Absolute moves
G1 X10 Y280 F3600 ; Move Y-carriage for part removal
G4 S30 ; Wait 30 seconds (since M84 seems ignored with arguments)
G29 S2 ; Clear Mesh Bed leveling (if any)
M84 ; disable motors
; end of end code