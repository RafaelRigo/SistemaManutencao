create schema SisManu

create table SisManu.Funcionario (
id int identity(1, 1) primary key,
nome varchar(50) not null,
salario money not null,
dataCadastro date not null,
)

insert into SisManu.Funcionario
values
('José da Silva', 12000, getdate())

select * from SisManu.Funcionario