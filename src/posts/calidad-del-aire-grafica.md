---
layout: post
title: Graficas de calidad del aire
date:  2016-05-25
tags: 
  - Calidad del aire
  - Reportes
description: En está página podrán observar por medio de dos graficas, como se mueve la cálidad del aire en la ciudad de monterrey...
author: Ciudadano M
image: lucy_logo.png
---

En está página podrán observar por medio de dos graficas, como se mueve la cálidad del aire en la ciudad de monterrey. 

Solo seleccionen la estación que desean observar y se reflejaran los cambios en la grafica.

<br/>

<div id="controls">
	<select id="pollutant-char">
	 <option value="PM2.5">PM-2.5</option>
	 <option value="PM10">PM-10</option>
	</select> 

	<select id="station-char">
	 <option value="0">-- Selecciona una estación --</option>
	 <option value="1">Noroeste - Topo Chico</option>
	 <option value="2">Suroeste - Santa Catarina</option>
	 <option value="3">Centro - Monterrey</option>
	 <option value="4">Noroeste - San Nicolas</option>
	 <option value="5">Sureste - Pastora</option>
	 <option value="6">Nororeste 2 - Garcia</option>
	 <option value="7">Norte - Escobedo</option>
	 <option value="8">Noreste 2 - Apodaca</option>
	 <option value="10">Suroeste 2 - San Pedro</option>
	 <option value="11">Sureste 2 - Benito Juarez</option>
	</select> 
</div>

<div id="chart-container-oms" style="width:100%; height:400px;"></div>

<br/>

Promedio por hora:

<br/>

<div id="chart-container-average" style="width:100%; height:400px;"></div>

<br/>


