var conn = require('./db');
var Pagination = require('./pagination');
var moment = require('moment');

module.exports = {
	
	render(req, res, error, success){
		
		res.render('clients', { 
			title: 'Cadastro de clientes - On-Bikes!',
			background: 'images/img_bg_2.jpg',
			h1: 'Cadastre seu clientes!',
			body: req.body,
			error,
			success,
			user
		});
		
	},
	
	save(fields){
		
		return new Promise((resolve, reject)=>{
			
			let status = 1;
			
			let query, params = [
				fields.name,
				fields.email,
				fields.tipo,
				status,
				fields.tel,
				fields.cel,
			];
			
			if (parseInt(fields.id) > 0) {
				
				query = `
					UPDATE tb_clients
					SET
						name = ?,
						email = ?,
						tipo = ?,
						status = ?,
						tel = ?,
						cel = ?
					WHERE id = ?
				`;
				
				params.push(fields.id);
				
			} else {
				
				query = `
					INSERT INTO tb_clients (name, email, tipo, status, tel, cel)
					VALUES (?,?,?,?,?,?)
				`;

			}

		
			conn.query(query, params, (err, results)=>{
				
				if (err) {
					reject(err);
				} else {
					resolve(results);
				}
				
			});
			
		});
		
	},
	
	getClientes(req){
		
		return new Promise((resolve, reject)=>{
			
			let page = (req.query.page) ? req.query.page : 1;
			let dtstart = req.query.start;
			let dtend = req.query.end;
			
			//if (!page) page = 1;
			
			let params =[];
			
			if (dtstart && dtend) params.push(dtstart, dtend);
			
			let pag = new Pagination(`
				SELECT SQL_CALC_FOUND_ROWS * 
				FROM tb_clients
				${(dtstart && dtend) ? 'WHERE register AND userId = 8 BETWEEN ? AND ?' : ''}
				ORDER BY name LIMIT ?,?
			`, params);

			userId = user.userID

			pag.getPage(page).then(data=>{
				
				resolve({
					data,
					links: pag.getNavigation(req.query)
				});
				
			})
			
		});

    },
	
	delete(id){
		
		return new Promise((resolve, reject)=>{
			
			conn.query(`
				DELETE FROM tb_clients WHERE id = ?
			`, [
				id
			], (err,results)=>{
				
				if (err) {
					
					reject(err);
					
				} else {
					
					resolve(results);
					
				}
				
			});
			
		});
		
	},
	
	chart(req){
		
		return new Promise((resolve, reject)=>{
			
			conn.query(`
				SELECT
					CONCAT(YEAR(date), '-', MONTH(date)) AS date,
					COUNT(*) AS total,
					SUM(people) / COUNT(*) AS avg_people
				FROM tb_clients
				WHERE
					register BETWEEN ? AND ?
				GROUP BY YEAR(date), MONTH(date)
				ORDER BY YEAR(date) DESC, MONTH(date) DESC;
			`, [
				req.query.start,
				req.query.end
			], (err, results)=>{
				
				if (err) {
					
					reject(err);
					
				} else {
					
					let months = [];
					let values = [];
					
					results.forEach(row=>{
						
						months.push(moment(row.date).format('MMM YYYY'));
						values.push(row.total);
						
					});
					
					resolve({
						months,
						values
					});
					
				}
				
			});
			
		});
		
	},
	
	dashboard(){
		
		return new Promise((resolve, reject)=>{
			
			conn.query(`
				SELECT
					(SELECT COUNT(*) FROM tb_contacts) AS nrcontacts,
					(SELECT COUNT(*) FROM tb_menus) AS nrmenus,
					(SELECT COUNT(*) FROM tb_clietes) AS nrclientes,
					(SELECT COUNT(*) FROM tb_users) AS nrusers
			`, (err, results)=>{
				
				if (err) {
					
					reject(err);
					
				} else {
					
					resolve(results[0]);
					
				}
				
			});
			
		});
		
	}
	
}