const factories = [
		  { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
		  { name: "BR2", employees: ["Jessie", "Karen", "John"] },
		  { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
		  { name: "BR4", employees: [] }
		];
		function countEmpNum(){
			var countEmpList = [];
			for (let i=0;i<4;i++){
				var factoryName = factories[i].name;
				var count = factories[i].employees.length;
				countEmpList.push({ name:factoryName, count:count})				
			}
			console.log(countEmpList)
		}
		
		
		function countFacNum(){
			var countFacSet = new Set();
			for (let i=0;i<4;i++){
				for (let j=0;j<factories[i].employees.length;j++){
					countFacSet.add(factories[i].employees[j]);
				}
			}
			
			var countFacList = Array.from(countFacSet);
			var countFacEmp = [];
			for (let i=0;i<countFacList.length;i++){
				facCount = 0;
				for (let j=0;j<4;j++){
					for (let k=0;k<factories[j].employees.length;k++){
						if (countFacList[i] == factories[j].employees[k]){
							facCount++ ;
						}
					}
				}
				countFacEmp.push({name:countFacList[i], count:facCount});
			}
			console.log(countFacEmp);
		}
		
		
		function sortFacEmp(){
			for (let i=0;i<4;i++){
				factories[i].employees.sort();
				console.log(factories[i].employees);	
			}
			
		}
		console.log("Q1:");
		countEmpNum();
		console.log("Q2:");
		countFacNum();
		console.log("Q3:");
		sortFacEmp();
		
		
		
		
		
		const employeeType = [
			  {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
			  {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
			  {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
		];

		const employees = [
				{id: 1, name: "Alice", type: 2},
				{id: 2, name: "Bob", type: 3},
				{id: 3, name: "John", type: 2},
				{id: 4, name: "Karen", type: 1},
				{id: 5, name: "Miles", type: 3},
				{id: 6, name: "Henry", type: 1}
		];

		const tasks = [
			  {id: 1, title: "task01", duration: 60},
			  {id: 2, title: "task02", duration: 120},
			  {id: 3, title: "task03", duration: 180},
			  {id: 4, title: "task04", duration: 360},
			  {id: 5, title: "task05", duration: 30},
			  {id: 6, title: "task06", duration: 220},
			  {id: 7, title: "task07", duration: 640},
			  {id: 8, title: "task08", duration: 250},
			  {id: 9, title: "task09", duration: 119},
			  {id: 10, title: "task10", duration: 560},
			  {id: 11, title: "task11", duration: 340},
			  {id: 12, title: "task12", duration: 45},
			  {id: 13, title: "task13", duration: 86},
			  {id: 14, title: "task14", duration: 480},
			  {id: 15, title: "task15", duration: 900}
		];
		
		function timeCounting(str){
			hr = parseInt(str.slice(0,2));
			if (hr == 0) hr = 24;
			me = parseInt(str.slice(3,5));
			sd = parseInt(str.slice(6,8));
			return {hour:hr, minute:me, second:sd};
		}
		
		function timeCalculating(time1, time2){
			second1 = time1.hour*3600 + time1.minute*60 + time1.second;
			second2 = time2.hour*3600 + time2.minute*60 + time2.second;
			period = second1 - second2;
			period = period / 3600;
			return period
		}
		
		function calHour(){
		
			for (i=0;i<3;i++){
				for(j=1;j<4;j++){
					if (employeeType[i].id == j){
						begin_time = timeCounting(employeeType[i].work_begin);
						end_time = timeCounting(employeeType[i].work_end);
						period = timeCalculating(end_time, begin_time);
						employeeType[i].work_period = period; //add new item in employeeType
					}
				}
			}
			
		}
		
		function totalhour(){
			totalhours = 0
			for (i=0;i<employees.length;i++){
				for (j=0;j<employeeType.length;j++){
					if (employees[i].type == employeeType[j].id){
						totalhours = totalhours + employeeType[j].work_period;
					}
				}
			}
			console.log(totalhours);
			return totalhours;
		}
		
		function howManyEmployeeByTime(time){
			time_obj = timeCounting(time);
			empnum = 0;
			for (i=0;i<employees.length;i++){
				for (j=0;j<employeeType.length;j++){
					if (employees[i].type == employeeType[j].id){
						begin_time = timeCounting(employeeType[j].work_begin);
						end_time = timeCounting(employeeType[j].work_end);
						if (time_obj.hour >= begin_time.hour && time_obj.hour <= end_time.hour){
							if (time_obj.hour == end_time.hour && time_obj.minute > end_time.minute){
								null;
							}
							else if (time_obj.hour == end_time.hour && time_obj.second > end_time.second){
								null;
							}
							else{
								empnum++;
							}
						}
					}
				}
			}
			console.log(empnum)
		}
		
		function caltaskdays(totalhours){ // work hours are 42 per day.
			work_minute = totalhours*60; 
			total_minute = 0;
			for (i=0;i<tasks.length;i++){
				total_minute = total_minute + tasks[i].duration;
			}
			days_needed = total_minute / work_minute; 
			days_needed = days_needed*100|0;
			days_needed = days_needed/100;
			
			workdays = 0; //calculate the needed days for completing the tasks.
			
			while(workdays < days_needed){
				workdays++;
			}
			console.log("it needs",days_needed,"days to complete all tasks, so",workdays,'days is at least needed.');
			return [days_needed, workdays];
			
		}
		
		calHour(); // add time period in employeeType
		console.log("Q4");
		totalhours = totalhour();
		console.log("Q5");
		howManyEmployeeByTime("17:00:00");
		console.log("Q6");
		caltaskdays(totalhours);
