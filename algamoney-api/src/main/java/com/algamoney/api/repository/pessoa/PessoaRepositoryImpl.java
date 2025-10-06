package com.algamoney.api.repository.pessoa;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.algamoney.api.model.Pessoa;
import com.algamoney.api.repository.filter.PessoaFilter;

public class PessoaRepositoryImpl implements PessoaRepositoryQuery {
	
	 @PersistenceContext
	 private EntityManager entityManager;
	 
	 @Override
	 public Page<Pessoa> filter(PessoaFilter pessoaFilter, Pageable pageable){
		 StringBuilder jpql = new StringBuilder();
		 jpql.append("SELECT p FROM Pessoa p ");
		 jpql.append("WHERE 1 = 1 ");
		 
		 if (!StringUtils.isEmpty(pessoaFilter.getNome())) {
	            jpql.append("AND LOWER(p.nome) LIKE :nome ");
	     }
		 
		 jpql.append("ORDER BY p.nome DESC");
		 
		 TypedQuery<Pessoa> query = entityManager.createQuery(jpql.toString(), Pessoa.class);
		 
		 if (!StringUtils.isEmpty(pessoaFilter.getNome())) {
	          query.setParameter("nome", "%" + pessoaFilter.getNome().toLowerCase() + "%");
	     }
		 
		 adicionarRestricoesDePaginacao(query, pageable);
		 
		 List<Pessoa> pessoas = query.getResultList();
	     return new PageImpl<>(pessoas, pageable, total(pessoaFilter));

	 }	 

	 @Override
		public Page<Pessoa> listPeople(PessoaFilter pessoaFilter, Pageable pageable) {
				// Cria um CriteriaBuilder a partir do EntityManager
				CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();

				// Cria um CriteriaQuery para a entidade Pessoa
				CriteriaQuery<Pessoa> criteriaQuery = criteriaBuilder.createQuery(Pessoa.class);
				Root<Pessoa> root = criteriaQuery.from(Pessoa.class);

				// Lista para armazenar as restrições
				List<Predicate> predicates = new ArrayList<>();

				// Adiciona filtros
				if (!StringUtils.isEmpty(pessoaFilter.getNome())) {
						Predicate nomePredicate = criteriaBuilder.like(criteriaBuilder.lower(root.get("nome")), "%" + pessoaFilter.getNome().toLowerCase() + "%");
						Predicate ativoPredicate = criteriaBuilder.equal(root.get("ativo"), 1);
						predicates.add(nomePredicate);
						predicates.add(ativoPredicate);
				}

				// Adiciona as restrições ao CriteriaQuery
				criteriaQuery.where(predicates.toArray(new Predicate[0]));

				// Define a ordenação
				criteriaQuery.orderBy(criteriaBuilder.desc(root.get("nome")));

				// Cria a consulta
				TypedQuery<Pessoa> query = entityManager.createQuery(criteriaQuery);

				// Aplica a paginação
				adicionarRestricoesDePaginacao(query, pageable);

				// Executa a consulta e obtém os resultados
				List<Pessoa> pessoas = query.getResultList();
				return new PageImpl<>(pessoas, pageable, total(pessoaFilter));
		}

	 
	 private void adicionarRestricoesDePaginacao(TypedQuery<?> query, Pageable pageable) {
	        int paginaAtual =  pageable.getPageNumber();
	        int totalRegistroPorPagina = pageable.getPageSize();
	        int primeiroRegistroDaPagina = paginaAtual * totalRegistroPorPagina;

	        query.setFirstResult(primeiroRegistroDaPagina);
	        query.setMaxResults(totalRegistroPorPagina);
	 }
	 
	 private Long total(PessoaFilter pessoaFilter) {
		    StringBuilder jpql = new StringBuilder();
		    jpql.append("SELECT COUNT(p) FROM Pessoa p ");
		    jpql.append("WHERE 1 = 1 ");

		    if (!StringUtils.isEmpty(pessoaFilter.getNome())) {
		        jpql.append("AND LOWER(p.nome) LIKE :nome ");
		    }

		    TypedQuery<Long> query = entityManager.createQuery(jpql.toString(), Long.class);

		    if (!StringUtils.isEmpty(pessoaFilter.getNome())) {
		        query.setParameter("nome", "%" + pessoaFilter.getNome().toLowerCase() + "%");
		    }

		    return query.getSingleResult();
	 }

}
